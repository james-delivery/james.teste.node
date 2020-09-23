import Transfer from '../Entities/Transfer'

const data = {
    amount: jest.fn(),
    id: jest.fn(),
    sourceId: jest.fn(),
    targetId: jest.fn(),
    status: jest.fn(),
    fundingDate: jest.fn(),
    fundingEstimatedDate: jest.fn(),
    dateCreated: jest.fn(),
    dateUpdated: jest.fn(),
    compensationId: jest.fn(),
    metadata: {
        orderId: jest.fn(),
    }
}

export default class MockTranfer extends Transfer{
    constructor() {
        super(data, jest.fn().mockReturnValue('1823nianws'))
    }
}