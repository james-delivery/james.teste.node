import MetadataInterface from './MetadataInterface'

export default class TransferInterface {
    amount: String
    id: String
    metadata: MetadataInterface
    sourceId: String
    targetId: String
    status: String
    fundingDate: any
    fundingEstimatedDate: any
    dateCreated: any
    dateUpdated: any
    compensationId: String
}