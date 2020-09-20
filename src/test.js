"use strict";
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const { Client } = require("pg");
const node_fetch_1 = require("node-fetch");

function fetchDatabase() {
    return new Promise(async (resolve, reject) => {
        try {
            const client = new Client({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
            });

            client.connect();

            let todayInit = new Date(new Date().setHours(0, 0, 0));
            let todayEnd = new Date(new Date().setHours(23, 59, 59));

            if (todayInit.getDay() == 2) {
                todayEnd.setDate(todayInit.getDate() + 1);
            }

            todayEnd = todayEnd.toISOString();
            todayInit = todayInit.toISOString();
            
            console.log(todayEnd);
            console.log(todayInit);
            const res = await client.query(`
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
                LIMIT 70;`, [todayInit, todayEnd]).then((result) => {
                    resolve(result.rows);
                    client.end();
                });
        } catch (error) {
            console.log(`Error when trying to retrieve compensations: ${error.message}`);
            reject(error)
        }
    }).then((rows) => {
        return rows;
    }).catch((error) => {
        console.log(error)
    });
}

function afterTransfer(data, compensationId) {
    return (async () => {
        const client = new Client({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        });
        await client.connect();
        let terStatus = "paid";
        let hasError = false;
        if (Object.keys(data).length === 0) {
            console.error("TER unexpected Error: ", data);
            await client.end();
            return;
        }
        if (data['errors']) {
            console.error("TER Error: ", data);
            terStatus = "non-identified-error"
            if (getIdempotencykeyError(data.errors).length > 0) {
                terStatus = "paid";
                hasError = true;
            }
        }
        const now = new Date().toISOString();
        
        const updateQuery = "update compensations set status = $3, payment_date = $1, updated_at = $1 where id = $2";
        const updateResponse = await client.query(updateQuery, [
            now,
            compensationId,
            terStatus
        ]).then(async (result) => {
            console.log(data);
            if (terStatus == "paid") {
                const insertQuery = `
                INSERT INTO transfers 
                    (created_at, updated_at, amount, pagarme_transfer_id, reference_id, source_id, target_id, status, 
                    funding_date, funding_estimated_date, date_created, date_updated, reference_type) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
                const insertResponse = await client.query(insertQuery, [
                    now,
                    now,
                    data['amount'],
                    data['id'],
                    data['order_id'],
                    data['source_id'],
                    data['target_id'],
                    data['status'],
                    data['funding_date'],
                    data['funding_estimated_date'],
                    data['date_created'],
                    data['date_updated'],
                    "Order"
                ])
            }
        });

        await client.end();
    })();
}

function sendToPagarMe(data) {
    return (async () => {
        let json = null;
        await node_fetch_1.default('https://api.pagar.me:443/1/transfers', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Idempotency-Key': data['compensation_id']
            },
            body: JSON.stringify({
                target_id: data['compensation_recipient_id'],
                source_id: 'TESTE_MAIN_ACCOUNT',
                amount: data['compensation_amount'],
                api_key: 'TESTE_PAGARME_KEY',
                metadata: {
                    order_id: data['order_id'],
                    compensation_id: data['compensation_id'],
                },
            }),
        }).then(async (response) => {
            json = await response.json();
            console.log(`Sent: ${JSON.stringify(data)} ${JSON.stringify(json)}`);
            await afterTransfer(json, data['compensation_id']);
        }).catch((error) => {
            console.log(error);
            console.error(`PagarMe Transfer Error - DATA: ${JSON.stringify(data)} - ERROR: ${JSON.stringify(error)}`);
        });
    })();
}

function getIdempotencykeyError(data) {
    return data.filter(function(data) {
        return data.message == "Idempotency-Key must be unique"
    });
}

function handler(event) {
    return (async () => {
        const fromDatabase = await fetchDatabase();
        console.log("array ", fromDatabase);
        for (let i = 0; i < fromDatabase.length; i++) {
            sendToPagarMe(fromDatabase[i]);
        }
        return {
            statusCode: '200',
            body: JSON.stringify({
                finished: true
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    })();
}
exports.handler = handler;
