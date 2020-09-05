'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step(
        (generator = generator.apply(
          thisArg,
          _arguments || []
        )).next()
      );
    });
  };
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule
      ? mod
      : {
          default: mod,
        };
  };
Object.defineProperty(exports, '__esModule', {
  value: true,
});
const pg = __importStar(require('pg'));
const node_fetch_1 = __importDefault(require('node-fetch'));

function fetchDatabase() {
  return __awaiter(this, void 0, void 0, function* () {
    const client = new pg.Client();
    yield client.connect();
    var todayEnd = new Date(new Date().setHours(0, 0, 0));
    var todayEnd = new Date(new Date().setHours(23, 59, 59));
    if (todayEnd.getDay() == 2) {
      todayEnd.setDate(todayEnd.getDate() + 1);
    }
    todayEnd = todayEnd.toISOString();
    todayInit = todayInit.toISOString();
    const res = yield client.query(
      `
                SELECT DISTINCT ON (c.id)
                  c.order_id AS order_id,
                  c.id AS compensation_id,
                  c.amount AS compensation_amount,
                  c.status AS compensation_status,
                  c.expected_payment_date AS compensation_expected_payment_date,
                  c.pagarme_recipient_id AS compensation_recipient_id
                FROM compensations c
                    WHERE c.amount > 0
                      AND c.status = 'waiting_payment'
                      AND c.expected_payment_date - interval '3 hours' >= $1
                      AND c.expected_payment_date - interval '3 hours' <= $2
                ORDER BY c.id
                LIMIT 70;`,
      [todayInit, todayEnd]
    );
    yield client.end();
    return res.rows;
  });
}

function afterTransfer(data, compensationId) {
  return __awaiter(this, void 0, void 0, function* () {
    const client = new pg.Client();
    yield client.connect();
    let terStatus = 'paid';
    let hasError = false;
    if (Object.keys(data).length === 0) {
      console.error('TER unexpected Error: ', data);
      yield client.end();
      return;
    }
    if (data['errors']) {
      console.error('TER Error: ', data);
      terStatus = 'non-identified-error';
      if (getIdempotencykeyError(data.errors).length > 0) {
        terStatus = 'paid';
        hasError = true;
      }
    }
    const now = new Date()
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');
    const updateQuery =
      'update compensations set status = $3, payment_date = $1, updated_at = $1 where id = $2';
    const updateResponse = yield client.query(updateQuery, [
      now,
      compensationId,
      terStatus,
    ]);
    if (terStatus == 'paid' && !hasError) {
      const insertQuery = `
                    INSERT INTO transfers 
                      (created_at, updated_at, amount, pagarme_transfer_id, reference_id, source_id, target_id, status, 
                       funding_date, funding_estimated_date, date_created, date_updated, reference_type) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
      const insertResponse = yield client.query(insertQuery, [
        now,
        now,
        data['amount'],
        data['id'],
        data['metadata']['order_id'],
        data['source_id'],
        data['target_id'],
        data['status'],
        data['funding_date'],
        data['funding_estimated_date'],
        data['date_created'],
        data['date_updated'],
        'Order',
      ]);
    }
    yield client.end();
  });
}

function sendToPagarMe(data) {
  return __awaiter(this, void 0, void 0, function* () {
    yield node_fetch_1
      .default('https://api.pagar.me:443/1/transfers', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': data['compensation_id'],
        },
        body: JSON.stringify({
          target_id: data['compensation_recipient_id'],
          source_id: ENV['MAIN_ACCOUNT'],
          amount: data['compensation_amount'],
          api_key: ENV['PAGARME_KEY'],
          metadata: {
            order_id: data['order_id'],
            compensation_id: data['compensation_id'],
          },
        }),
      })
      .then((response) => response.json())
      .then((json) =>
        __awaiter(this, void 0, void 0, function* () {
          yield afterTransfer(json, data['compensation_id']);
        })
      )
      .catch((error) => {
        console.error(
          `PagarMe Transfer Error - DATA: ${JSON.stringify(
            data
          )} - ERROR: ${JSON.stringify(error)}`
        );
      });
  });
}

function getIdempotencykeyError(data) {
  return data.filter(function (data) {
    return data.message == 'Idempotency-Key must be unique';
  });
}

function handler(event) {
  return __awaiter(this, void 0, void 0, function* () {
    const fromDatabase = yield fetchDatabase();
    console.log('array ', fromDatabase);
    for (let i = 0; i < fromDatabase.length; i++) {
      yield sendToPagarMe(fromDatabase[i]);
    }
    return {
      statusCode: '200',
      body: JSON.stringify({
        finished: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  });
}
exports.handler = handler;
