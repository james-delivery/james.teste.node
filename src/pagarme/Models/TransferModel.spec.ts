import TransferModel from './TransferModel'
import mockTransfer from '../__fixtures__/Transfer'

describe('TransferModel', () => {
    it('should define a `TransferModel`', () => {
        const mock = new TransferModel()
        expect(mock).toBeDefined()
    })
    it('should have success to create a new `Transfer`', async () => {
        const newTransfer = new TransferModel()
        const mock = new mockTransfer()
        newTransfer.create(mock)
        const { query } = await newTransfer.getClient()
        expect(query).toBeCalled()
    })
})