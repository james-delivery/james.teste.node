import DBConnection from './DbConnection'

describe('DbConnection', () => {
    it('should define a `TransferModel`', () => {
        const mock = new DBConnection()
        expect(mock).toBeDefined()
    })
    it('should get a connection with get connect()', async () => {
        const mock = new DBConnection()
        const connection = await mock.connect()
        expect(Object.keys(connection)).toEqual(['query', 'end'])
    })
    it('should get a client with get getClient()', async () => {
        const mock = new DBConnection()
        const client = await mock.getClient()
        expect(Object.keys(client)).toEqual(['query', 'end'])
    })
})
