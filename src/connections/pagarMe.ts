import * as node_fetch from "node-fetch";

import { Compensations } from "../entity/compensations";
import { afterTransfer } from "../database/connectionDatabase";
import { PagarMeResponse } from "../dto/pagarMeResponse";

export const sendToPagarMe = async function (compensation: Compensations) {
  await node_fetch
    .default("https://api.pagar.me:443/1/transfers", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": compensation.id.toString(),
      },
      body: JSON.stringify({
        target_id: compensation.recipient_id,
        source_id: process.env.MAIN_ACCOUNT,
        amount: compensation.amount,
        api_key: process.env.PAGARME_KEY,
        metadata: {
          order_id: compensation.recipient_id,
          compensation_id: compensation.id,
        },
      }),
    })
    .then((response) => response.json())
    .then(async (json) => {
      if (Object.keys(json).length === 0 || json["errors"]) {
        console.error("TER unexpected Error: ", json);
        return;
      } else {
        const responsePagarMe = new PagarMeResponse(
          json["amount"],
          json["id"],
          json["metadata"]["order_id"],
          json["source_id"],
          json["target_id"],
          json["status"],
          json["funding_date"],
          json["funding_estimated_date"],
          json["date_created"],
          json["date_updated"]
        );
        await afterTransfer(responsePagarMe, compensation.id);
      }
    })
    .catch((error) => {
      console.error(
        `PagarMe Transfer Error - DATA: ${JSON.stringify(
          compensation
        )} - ERROR: ${JSON.stringify(error)}`
      );
    });
};
