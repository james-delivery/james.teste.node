import TransferInterface from './TransferInterface';
import MetadataInterface from './MetadataInterface';

class Mock implements TransferInterface {
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
}

describe('TransferInterface', () => {
    it('should implements the `TransferInterface` interface', () => {
        const mockInterface = new Mock()
        expect(mockInterface).toBeDefined()
    })
})