import Transfer from './Transfer'

const mockDefine = () => {
    new Transfer(undefined, undefined)
}

describe('Transfer', () => {
    it('should define a `Transfer`', () => {
        const mockData = {
            metadata: {}
        }
        mockData['metadata']['order_id'] = '187263891'
        const mock = new Transfer(mockData, '72h727')
        expect(mock).toBeDefined()
    })
    it('should define a `Transfer` passing no data and getting an error', () => {
        expect(mockDefine).toThrow(TypeError)
    })
})
