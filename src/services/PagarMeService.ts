import { PagarMe } from '../clients/PagarMe';

import CompensationRepository from '../repositories/CompensationRepository';
import moment = require('moment');
import TransferRepository from '../repositories/TransferRepository';

const TERSTATUS_PAID = 'paid';

export default class PagarMeService {
  static async sendCompensation(compensation: any) {
    try {
      const pagarMe = new PagarMe();
      const transferResponse = await pagarMe.createTransaction(
        compensation
      );

      await this.afterTransfer(
        transferResponse,
        compensation.compensation_id
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async afterTransfer(data: any, compensationId: number) {
    let hasError = false;
    let terStatus = TERSTATUS_PAID;

    if (Object.keys(data).length === 0) {
      console.error('TER unexpected Error: ', data);
      return;
    }
    if (data['errors']) {
      console.error('TER Error: ', data);
      terStatus = 'non-identified-error';
      if (this.getIdempotencykeyError(data.errors)) {
        terStatus = TERSTATUS_PAID;
        hasError = true;
      }
    }
    const now = moment().utc().toDate();

    const compensationRepository = new CompensationRepository();
    compensationRepository.updateCompensationById(
      terStatus,
      now,
      compensationId
    );
    if (terStatus == TERSTATUS_PAID && !hasError) {
      await this.saveTransfer(now, data);
    }
  }

  static async saveTransfer(transferData: Date, data: any) {
    const transferRepository = new TransferRepository();
    transferRepository.saveTransfer(
      transferData,
      data['amount'],
      data['id'],
      data['metadata']['order_id'],
      data['source_id'],
      data['target_id'],
      data['status'],
      data['funding_date'],
      data['funding_estimated_date'],
      data['date_created'],
      data['date_updated'],
      'Order'
    );
  }

  static async getIdempotencykeyError(data) {
    return data.filter((data) => {
      return data.message == 'Idempotency-Key must be unique';
    });
  }
}
