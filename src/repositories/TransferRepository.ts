import { Database } from '../util/Database';

export default class TransferRepository {
  saveTransfer(
    transferData: Date,
    amount: number,
    id: number,
    reference_id: number,
    source_id: string,
    target_id: string,
    status: string,
    funding_date: Date,
    funding_estimated_date: Date,
    date_created: Date,
    date_updated: Date,
    reference_type: string
  ) {
    const client = new Database();

    return client.query(
      `
      INSERT INTO transfers 
        (created_at, updated_at, amount, pagarme_transfer_id, reference_id, source_id, target_id, status, 
         funding_date, funding_estimated_date, date_created, date_updated, reference_type) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
      [
        transferData,
        transferData,
        amount,
        id,
        reference_id,
        source_id,
        target_id,
        status,
        funding_date,
        funding_estimated_date,
        date_created,
        date_updated,
        reference_type,
      ]
    );
  }
}
