import CompensationModel from './CompensationModel'
import data from '../__fixtures__/Compensations'

const RealDate = Date.now

describe('CompensationModel', () => {
    beforeAll(() => {
        global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime())
    })
    afterAll(() => {
        global.Date.now = RealDate
    })
    it('should define a `TransferModel`', () => {
        const mock = new CompensationModel()
        expect(mock).toBeDefined()
    })
    it('should have success to getAll `Compensations`', async () => {
        CompensationModel.prototype.getClient = jest.fn().mockResolvedValue({
            query: jest.fn().mockResolvedValue({ rows: data }),
            end: () => {}
        })
        const newCompensation = new CompensationModel()
        const value = await newCompensation.getAll()
        expect(typeof value).toEqual('object')
        expect(value.length).toEqual(3)
    })
    it('should have success to getAll `Compensations` with getDay == 2', async () => {
        CompensationModel.prototype.getClient = jest.fn().mockResolvedValue({
            query: jest.fn().mockResolvedValue({ rows: data }),
            end: () => {}
        })
        const realGetDay = global.Date.prototype.getDay
        global.Date.prototype.getDay = jest.fn().mockReturnValue(2)
        const newCompensation = new CompensationModel()
        const value = await newCompensation.getAll()
        expect(typeof value).toEqual('object')
        expect(value.length).toEqual(3)
        global.Date.prototype.getDay = realGetDay
    })
    it('should have success to update a `Compensation`', async () => {
        CompensationModel.prototype.getClient = jest.fn().mockResolvedValue({
            query: jest.fn().mockResolvedValue({ rows: data }),
            end: () => {}
        })
        const newCompensation = new CompensationModel()
        const value = await newCompensation.update(data, 'sladd923')
        expect(typeof value).toEqual('object')
        expect(value.length).toEqual(3)
    })
    it('should have success to getClient `Compensations`', async () => {
        const newCompensation = new CompensationModel()
        const { query, end } = await newCompensation.getClient()
        expect(typeof query).toEqual('function')
        expect(typeof end).toEqual('function')
    })
})