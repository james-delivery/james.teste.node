import { Client } from 'pg';

const database = {
  client: null,

  async init() {
    // Starting pg client with env vars for connection:
    this.client = new Client()
    await this.client.connect();
  },

  async close() {
    await this.client.end();
  },

  query(sql, params) {
    return this.client.query(sql, params);
  },

  /**
   * Get compensations to process from postgresql database
   * With limit of 70 items per run
   */
  async getCompensationsToProcess(date): Promise < any[] > {
    let startDate = new Date(date.setHours(0, 0, 0)).toISOString();
    let endDate = new Date(date.setHours(23, 59, 59)).toISOString();

    // TODO! Verify date values in DB to check if "- interval '3 hours'" is realy need and input date may be in iso format
    const res = await this.query (
      `SELECT DISTINCT ON (c.id)
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
      LIMIT 70;`, [ startDate, endDate ]);

    return res.rows;
  },

  /**
   * Update compensation result status in compensation table
   */
  async updateCompensationRecord (
    compensationId, status
  ): Promise < any[] > {

    // TODO! check the right date format in DB:
    const now = new Date().toISOString();

    const sql = 'update compensations set status = $3, payment_date = $1, updated_at = $1 where id = $2';
    return await this.query(sql, [
      now,
      compensationId,
      status
    ]);
  },

  /**
   * Save transfer result in DB
   */
  async updateTransferRecord (
    data, status, hasError
  ): Promise < any > {
    if (status != 'paid' || hasError) {
      return false;
    }

    // TODO! check the right date format in DB:
    const now = new Date().toISOString();

    const insertQuery =
      `INSERT INTO transfers
        (created_at, updated_at, amount, pagarme_transfer_id, reference_id, source_id, target_id, status,
         funding_date, funding_estimated_date, date_created, date_updated, reference_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
    return await this.query(insertQuery, [
      now,
      now,
      data.amount,
      data.id,
      data.metadata.order_id,
      data.source_id,
      data.target_id,
      data.status,
      data.funding_date,
      data.funding_estimated_date,
      data.date_created,
      data.date_updated,
      'Order'
    ]);
  }
}

export default database;
