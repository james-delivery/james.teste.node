import ICreateTransferDTO from '@modules/compensations/dtos/ICreateTransferDTO';
export default interface IPaymentProvider {
    transfer(
        apiToken: string,
        recipient_id: string,
        amountData: number
    ): Promise<ICreateTransferDTO | undefined>;
}
