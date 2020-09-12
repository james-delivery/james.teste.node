export default interface ICreateTransferDTO {
    amount: number;
    pagarme_transfer_id: string;
    reference_id: string;
    source_id: string;
    target_id: string;
    status: string;
    funding_date: string;
    funding_estimated_date: string;
    date_created: string;
    date_updated: string;
    reference_type: string;
}
