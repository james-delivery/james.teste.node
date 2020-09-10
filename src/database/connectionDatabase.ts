import { Compensations } from "../entity/compensations";
import { PagarMeResponse } from "../dto/pagarMeResponse";
import { PaymentEnum } from "../commons/PaymentEnum";
import { createConnection } from "typeorm";
import { Transfers } from "../entity/transfers";

const connection = createConnection();

export const fetchDatabase = async function (): Promise<Compensations[]> {
  const client = await connection;
  return client
    .createQueryBuilder()
    .from(Compensations, "comp")
    .where("amount > 0")
    .andWhere(`status = '${PaymentEnum.STATUS_WAITING}'`)
    .andWhere("expected_payment_date + interval '3 hours' >= :date_init", {
      date_init: new Date(new Date().setHours(0, 0, 0)),
    })
    .andWhere("expected_payment_date - interval '3 hours' <= :date_fim", {
      date_fim: new Date(new Date().setHours(23, 59, 59)),
    })
    .limit(70)
    .execute();
};

export const afterTransfer = async function (
  pagarMeResponse: PagarMeResponse,
  compensationId: number
) {
  const client = await connection;
  const now = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  await client
    .createQueryBuilder()
    .update(Compensations)
    .set({
      status: PaymentEnum.STATUS_PAID,
      payment_date: new Date(),
      updated_at: new Date(),
    })
    .where("id = :id", { id: compensationId })
    .execute();
  const {
    amount,
    id,
    order_id,
    source_id,
    target_id,
    status,
    funding_date,
    funding_estimated_date,
    date_created,
    date_updated,
  } = pagarMeResponse;
  await client
    .createQueryBuilder()
    .insert()
    .into(Transfers)
    .values([
      {
        created_at: now,
        updated_at: now,
        amount,
        reference_id: id,
        order_id,
        source_id,
        target_id,
        status,
        funding_date,
        funding_estimated_date,
        date_created,
        date_updated,
        reference_type: PaymentEnum.REFERENCE_TYPE,
      },
    ])
    .execute();
};
