import Transfer from '../../models/Transfer';
import db from '../../config/database';
import client from '../../config/database';

class TransferRepository {
  constructor(){};

    public async create({created_at, updated_at, amount, pagarme_transfer_id,order_id, source_id, target_id, status, funding_date, funding_estimated_date, date_created, date_updated, reference_type} : Transfer) {
      try{
        const client = await db.connect();

    await db.query(`
      INSERT INTO transfers
        (created_at, updated_at, amount, pagarme_transfer_id, reference_id, source_id, target_id, status,
        funding_date, funding_estimated_date, date_created, date_updated, reference_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, [
        created_at, updated_at, amount, pagarme_transfer_id, order_id, source_id, target_id, status, funding_date, funding_estimated_date, date_created, date_updated, reference_type
      ]);

      client.release();
    }catch(error){
      await client.end();
      throw new Error('An error occurred while creating a transfer, details: ' + error);
    }
  }
}

export default TransferRepository;
