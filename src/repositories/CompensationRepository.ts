import { Database } from '../util/Database';

export default class CompensationRepository {
  getAll() {
    const client = new Database();

    return client.query(
      `
    SELECT DISTINCT ON (c.id)
      c.id AS compensation_id,
      c.order_id AS order_id,
      c.amount AS compensation_amount,
      c.status AS compensation_status,
      c.expected_payment_date AS compensation_expected_payment_date,
      c.recipient_id as pagarme_recipient_id
    FROM compensations c
        WHERE c.amount > 0
          AND c.status = 'waiting_payment'
          AND c.expected_payment_date - interval '3 hours' >= $1
          AND c.expected_payment_date - interval '3 hours' <= $2
    ORDER BY c.id
    LIMIT 10;`,
      [
        new Date(new Date().setHours(0, 0, 0)).toISOString(),
        new Date(new Date().setHours(23, 59, 59)).toISOString(),
      ]
    );
  }

  async createAndSave(
    orderId: string,
    recipientId: string,
    amount: number,
    expectedPaymentDate: Date
  ) {
    const client = new Database();

    return await client.query(
      `INSERT INTO compensations(order_id,recipient_id, amount, expected_payment_date) VALUES($1, $2, $3, $4) RETURNING *`,
      [orderId, recipientId, amount, expectedPaymentDate]
    );
  }

  async updateCompensationById(
    status: string,
    payment_date: Date,
    compensation_id: number
  ) {
    const client = new Database();
    return await client.query(
      `update compensations set status = $3, payment_date = $1, updated_at = $1 where id = $2`,
      [payment_date, compensation_id, status]
    );
  }
}
