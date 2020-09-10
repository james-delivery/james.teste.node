import fetch from 'node-fetch';
import AfterTransferService from '../services/AfterTransferService';

import TransferRepository from '../repositories/Transfers/TransferRepository';
import CompensationsRepository from '../repositories/Compensations/CompensationsRepository';

import Transfer from '../models/Transfer';
import Compensation from '../models/Compensation';

class SendToPagarMeService {
  private transferRepository: TransferRepository;

  private compensationsRepository: CompensationsRepository;

  constructor(
    transferRepository: TransferRepository,
    compensationsRepository: CompensationsRepository,
  ) {
    this.transferRepository = transferRepository;
    this.compensationsRepository = compensationsRepository;
  }

  public async execute(compensation: Compensation, now: string,) {
    try {
      const response = await fetch('https://api.pagar.me:443/transfers', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': compensation.id,
        },
        body: JSON.stringify({
          target_id: compensation.recipient_id,
          source_id: process.env.MAIN_ACCOUNT,
          amount: compensation.amount,
          api_key: process.env.PAGAR_ME_KEY,
          metadata: {
            order_id: compensation.order_id,
            compensation_id: compensation.id,
          },
        }),
      });

      const afterTransfer = new AfterTransferService(this.transferRepository, this.compensationsRepository);

      await afterTransfer.execute(
        // -> JSON example that shoud return from api request {response.json}
        // {
        //   amount: compensation.amount,
        //   created_at: new Date(),
        //   date_created: new Date(),
        //   date_updated: new Date(),
        //   funding_date: new Date(),
        //   funding_estimated_date: new Date(),
        //   pagarme_transfer_id: compensation.id,
        //   order_id: compensation.order_id,
        //   reference_type: 'Order',
        //   source_id: '123',
        //   status: 'paid',
        //   target_id: compensation.recipient_id,
        //   updated_at: new Date()
        // },
        response.json as unknown as Transfer,
        {
          id: compensation.id,
          payment_date: now,
          update_at: now,
          status: 'paid',
        },
      );
    } catch (error) {
      throw new Error(
        `An error occurred while fetching PagarMe API, details: ${error.message}`,
      );
    }
  }
}

export default SendToPagarMeService;
