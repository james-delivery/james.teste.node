import { injectable, inject } from 'tsyringe';

import Compensation from '@modules/compensations/infra/typeorm/entities/Compensation';
import ICompensationsRepository from '@modules/compensations/repositories/ICompensationsRepository';
import ITransferRepository from '@modules/compensations/repositories/ITransfersRepository';
import IPaymentProvider from '@shared/container/providers/PaymentProvider/Models/IPaymentProvider';

@injectable()
class CarryOutCompensationsService {
    constructor(
        @inject('CompensationsRepository')
        private compensationsRepository: ICompensationsRepository,

        @inject('TransferRepository')
        private transferRepository: ITransferRepository,

        @inject('PaymentProviderPagarMe')
        private paymentProviderPagarMe: IPaymentProvider
    ) {}

    public async execute(): Promise<Compensation[] | undefined> {
        const listCompensationsWithInterval = await this.compensationsRepository.findWaitingPaymentByInterval();
        listCompensationsWithInterval?.map(async (compensation) => {
            const recipient_id = compensation.recipient_id;
            const amount = compensation.amount;
            const transferData = await this.paymentProviderPagarMe.transfer(
                'ak_test_RQV5lu0W2IkThpAqLzAv6mVr2k81tt',
                recipient_id,
                amount
            );
            if (transferData) {
                // Mudar os status dos pagamentos realizados de Waiting Payment para Paid
                compensation.status = 'paid';
                compensation.payment_date = new Date();
                await this.compensationsRepository.save(compensation);

                // Inserir os pagamentos realizados
                await this.transferRepository.create(transferData);
            }
        });

        return listCompensationsWithInterval;
    }
}

export default CarryOutCompensationsService;
