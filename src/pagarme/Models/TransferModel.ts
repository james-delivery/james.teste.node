import DBConnection from './DbConnection';
import Transfer from '../Entities/Transfer';;

export default class CompensationModel extends DBConnection{
    private _client;

    constructor() {
        super()
        this._client = this.getClient()
    }
    
    getClient(){
        return this._client;
    }

    async create(transfer: Transfer){
        const client = this.getClient();

        const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        const insertQuery = `
        INSERT INTO transfers 
            (created_at, updated_at, amount, pagarme_transfer_id, reference_id, source_id, target_id, status, 
            funding_date, funding_estimated_date, date_created, date_updated, reference_type) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;

        await client.query(insertQuery, [
            now,
            now,
            transfer.amount,
            transfer.id,
            transfer.metadata.orderId,
            transfer.sourceId,
            transfer.targetId,
            transfer.status,
            transfer.fundingDate,
            transfer.fundingEstimatedDate,
            transfer.dateCreated,
            transfer.dateUpdated,
            "Order"
        ]);

        client.end();
    }
}