import IPaymentProvider from '@shared/container/providers/PaymentProvider/Models/IPaymentProvider';
import ICreateTransferDTO from '@modules/compensations/dtos/ICreateTransferDTO';

interface ITransfer {
    apiToken: string;
    recipient_id: string;
    amountData: number;
}

class FakePaymentProviderPagarMe implements IPaymentProvider {
    private transfers: ITransfer[] = [];
    public async transfer(
        apiToken: string,
        recipient_id: string,
        amountData: number
    ): Promise<ICreateTransferDTO | undefined> {
        this.transfers.push({
            apiToken,
            recipient_id,
            amountData,
        });
        return undefined;
    }
}

export default FakePaymentProviderPagarMe;
