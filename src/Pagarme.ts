import fetch from 'node-fetch';

const ENV = process.env;

export default class Pagarme {
  /**
   * Send transfer for one compensation to Pagarme Gateway
   */
  async sendCompensation(data: any): Promise < any > {
    try {
      const response = await fetch('https://api.pagar.me:443/1/transfers', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': data.compensation_id
        },
        body: JSON.stringify({
          target_id: data.compensation_recipient_id,
          source_id: ENV.MAIN_ACCOUNT,
          amount: data.compensation_amount,
          api_key: ENV.PAGARME_KEY,
          metadata: {
            order_id: data.order_id,
            compensation_id: data.compensation_id,
          },
        }),
      })

      const resonseData = response.json();

      return {
        resonseData,
        error: null,
      };
    } catch(e) {
      // TODO! add an better log strategy
      console.error(`PagarMe Transfer Error - DATA: ${JSON.stringify(data)} - ERROR: ${JSON.stringify(e)}`);

      return {
        resonseData: null,
        error: e,
      };
    }
  }
}
