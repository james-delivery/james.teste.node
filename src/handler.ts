import { Handler } from 'aws-lambda';
import Pagarme from './Pagarme';
import database from './database';

import 'source-map-support/register';

export const processCompensations: Handler = async () => {
  await database.init();

  // Expected payment date in format: 2020/09/09
  const date = parseDate(process.env.EXPECTED_PAYMENT_DATE);

  const compensations = await database.getCompensationsToProcess(date);

  const totalToProcess = compensations.length;
  let totalProcessed = 0;
  let totalWithError = 0

  // Sending one by one without concurrency, we can improve this with promise poll concurrency to improve execution time if need
  for (let i = 0; i < totalToProcess; i++) {
    const compensation = compensations[i];
    const result = await processCompensation(compensation, database);

    if (result.success) {
      totalProcessed ++;
    } else {
      totalWithError ++;
    }
  }

  await database.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      finished: true,
      // Usefull result data to analyze each run:
      totalGotFromDB: totalToProcess,
      totalProcessed,
      totalWithError
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

/**
 * Parse data in format YYYY/MM/DD to .js date format
 */
function parseDate(date) {
  const dateParts = date.split('/');

  if (dateParts.length != 3) {
    throw new Error('Invalid date, check EXPECTED_PAYMENT_DATE env var');
  }

  return new Date(dateParts[0],dateParts[1],dateParts[2]);
}

/**
 * Process one compensation, send transfer to pagarme and update DB
 */
async function processCompensation(compensation, db) {
  const pagarme = new Pagarme();

  let result = {
    success: false,
    error: null
  };

  try {
    const pagarmeResult = await pagarme.sendCompensation(compensation);

    if (!pagarmeResult.error) {
      let status = 'paid';
      let hasError = false;

      if (pagarmeResult.errors) {
        status = 'non-identified-error';
        if (getIdempotencykeyError(pagarmeResult.errors).length > 0) {
          status = 'paid';
          hasError = true;
        }
      }

      await db.updateCompensationRecord (
        compensation.compensation_id,
        status
      );

      await db.updateTransferRecord (
        pagarmeResult.data,
        status,
        hasError
      );

      result.success = true;
    }
  } catch(e) {
    // TODO! send error log
    result.error = e;
  }

  return result;
}

function getIdempotencykeyError(data) {
  return data.filter(function(data) {
    return data.message == 'Idempotency-Key must be unique';
  });
}
