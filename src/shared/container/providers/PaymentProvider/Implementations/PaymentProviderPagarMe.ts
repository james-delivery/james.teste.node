import IPaymentProvider from '@shared/container/providers/PaymentProvider/Models/IPaymentProvider';
import ICreateTransferDTO from '@modules/compensations/dtos/ICreateTransferDTO';
import axios from 'axios';

class PaymentProviderPagarMe implements IPaymentProvider {
    public async transfer(
        apiToken: string,
        recipient_id: string,
        amountData: number
    ): Promise<ICreateTransferDTO | undefined> {
        try {
            const data = {
                amount: amountData,
                api_key: apiToken,
                recipient_id: recipient_id,
            };
            const res = await axios.post(
                'https://api.pagar.me/1/transfers',
                data
            );
            const {
                amount,
                id,
                source_id,
                target_id,
                status,
                funding_date,
                funding_estimated_date,
                date_created,
                date_updated,
            } = res.data;

            const transferData = {
                amount,
                pagarme_transfer_id: id,
                reference_id: id,
                source_id,
                target_id,
                status,
                funding_date,
                funding_estimated_date,
                date_created,
                date_updated,
                reference_type: 'Order',
            };
            return transferData;
        } catch (error) {
            return undefined;
        }
    }
}

export default PaymentProviderPagarMe;
