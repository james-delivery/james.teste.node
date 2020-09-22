import TransferInterface from './Interfaces/TransferInterface';
import MetadataInterface from './Interfaces/MetadataInterface';

export default class Transfer implements TransferInterface {
    amount: String;
    id: String;
    metadata: MetadataInterface;
    sourceId: String;
    targetId: String;
    status: String;
    fundingDate: any;
    fundingEstimatedDate: any;
    dateCreated: any;
    dateUpdated: any;
    compensationId: String;

    constructor(data, compensationId) {
        this.amount = data['amount'];
        this.id = data['id'];
        this.metadata.orderId = data['metadata']['order_id'];
        this.sourceId = data['source_id'];
        this.targetId = data['target_id'];
        this.status = data['status'];
        this.fundingDate = data['funding_date'];
        this.fundingEstimatedDate = data['funding_estimated_date'];
        this.dateCreated = data['date_created'];
        this.dateUpdated = data['date_updated'];
        this.compensationId = compensationId
    }

}