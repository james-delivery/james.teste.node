import Compensation from '../../models/Compensation';
import UpdateCompensationDTO from './UpdateCompensationDTO';
import db from '../../config/database';
import client from '../../config/database';

class CompensationsRepository{
  private compensations: Compensation[];

  constructor(){
    this.compensations = [];
  }

  public async all(todayInit: Date, todayEnd: Date) : Promise<Compensation[]>{
    try{
      const client = await db.connect();
    const data = await client.query(`
      SELECT DISTINCT ON (c.id)
        c.order_id AS order_id,
        c.id AS id,
        c.amount AS amount,
        c.status AS status,
        c.expected_payment_date AS expected_payment_date,
        c.recipient_id AS recipient_id
      FROM compensations c
          WHERE c.amount > 0
            AND c.status = 'waiting_payment'
            AND c.expected_payment_date - interval '3 hours' >= $1
            AND c.expected_payment_date - interval '3 hours' <= $2
      ORDER BY c.id
      LIMIT 70;`, [todayInit, todayEnd]);

    this.compensations = data.rows;

    client.release();

    return this.compensations;

    }catch(error){
      await client.end();
      throw new Error('Error while fetching compensations, details: ' + error);
    }
  }

  public async updateCompensation({id, payment_date, status, update_at } : UpdateCompensationDTO) : Promise<void> {
    try {
      const client = await db.connect();
      await db.query("update compensations set status = $3, payment_date = $1, updated_at = $4 where id = $2", [
        payment_date,
        id,
        status,
        update_at
      ]);

      client.release();
    }catch(error){
      await client.end();
      throw new Error('Error while updating compensations, details: ' + error);
    }
  };

}

export default CompensationsRepository;
