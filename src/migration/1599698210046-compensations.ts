import { MigrationInterface, QueryRunner } from "typeorm";
import { listCompenstations } from "./compensationsList";

export class compensations1599698210046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE transfers (
            id serial PRIMARY KEY,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            amount NUMERIC(15, 2),
            pagarme_transfer_id VARCHAR ( 50 ) NOT NULL,
            reference_id VARCHAR ( 50 )  NOT NULL,
            source_id VARCHAR ( 50 )  NOT NULL,
            target_id VARCHAR ( 50 )  NOT NULL,
            status VARCHAR ( 50 ) NOT NULL,
            funding_date TIMESTAMP,
            funding_estimated_date TIMESTAMP,
            date_created TIMESTAMP,
            date_updated TIMESTAMP,
            reference_type VARCHAR ( 50 ) NOT NULL
        );
        CREATE TABLE compensations (
            id serial PRIMARY KEY,
            order_id VARCHAR ( 50 ) UNIQUE NOT NULL,
            amount NUMERIC(15, 2),
            status VARCHAR ( 50 ),
            expected_payment_date TIMESTAMP,
            pagarme_recipient_id VARCHAR ( 50 ) UNIQUE NOT NULL 
        );`);
    for (let compensation of listCompenstations) {
      let {
        amount,
        expected_payment_date,
        order_id,
        pagarme_recipient_id,
        status,
      } = compensation;
      queryRunner.query(
        `INSERT INTO public.compensations
        (order_id, amount, status, expected_payment_date, pagarme_recipient_id)
        VALUES(${order_id}, ${amount}, '${status}',${expected_payment_date}, ${pagarme_recipient_id});`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP table compensations; `);
    queryRunner.query(`DROP table transfers; `);
  }
}
