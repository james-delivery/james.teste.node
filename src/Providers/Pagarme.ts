import * as node_fetch from 'node-fetch'
import Compensation from '../entities/Compensation'
import Transfer from '../entities/Transfers'
import AftertransferService from '../services/afterTransferService'


export const sendToPagarme = async (compensation: Compensation) => {
  try{  
    const response =  await node_fetch.default('https://api.pagar.me:443/1/transfers', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': compensation.id
        },
        body: JSON.stringify({
            target_id: compensation.recipient_id,
            source_id: process.env.MAIN_ACCOUNT,
            amount: compensation.amount,
            api_key: process.env.PAGARME_KEY,
            metadata: {
                order_id: compensation.order_id,
                compensation_id: compensation.id,
            },
        }),
      });
      const reponseToTransfer = response.json as unknown as Transfer;
      const afterTransfer = new AftertransferService();

      afterTransfer.execute(reponseToTransfer, compensation.id)
  }catch(err) {
    throw new Error(
      `PagarMe Transfer Error - DATA: ${JSON.stringify(compensation)} - ERROR: ${JSON.stringify(err)}`
    )
  }

} 
