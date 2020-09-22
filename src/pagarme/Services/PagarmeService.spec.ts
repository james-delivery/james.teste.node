import PagarmeService from './PagarmeService';
import listOfCOmpensations from '../__fixtures__/Compensations';

jest.mock('../Entities/Transfer')

describe('PagarmeService', () => {
    it('should getIdempotencykeyError correctly to data with error message', () => {
        const mock = new PagarmeService()
        const data = [
            { message: 'test' },
            { message: 'Idempotency-Key must be unique' },
            { message: 'Idempotency-Key must be unique' }
        ]
        const value = mock.getIdempotencykeyError(data)
        expect(value.length).toEqual(2)
    })
    it('should getIdempotencykeyError correctly to data with an empty data array', () => {
        const mock = new PagarmeService()
        const data = []
        const value = mock.getIdempotencykeyError(data)
        expect(value.length).toEqual(0)
    })
    it('should proccess a list of compensations', async () => {
        const realAfterTransfer = PagarmeService.prototype.afterTransfer
        const mockAfterTransfer = jest.fn()
        PagarmeService.prototype.afterTransfer = mockAfterTransfer
        const mock = new PagarmeService()
        await mock.postCompensations(listOfCOmpensations)
        PagarmeService.prototype.afterTransfer = realAfterTransfer
        expect(mockAfterTransfer).toBeCalledTimes(3)
        
    })
    it('should proccess a list of compensations and got an error', async (done) => {
        const mock = new PagarmeService()
        try {
            await mock.postCompensations(listOfCOmpensations)
        } catch (error) {
            expect(error).toThrow()
        }
        done();
    })
})