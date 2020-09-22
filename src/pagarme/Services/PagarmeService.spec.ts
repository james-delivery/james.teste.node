import PagarmeService from './PagarmeService';
import listOfCOmpensations from '../__fixtures__/Compensations';
import MockTransfer from '../__fixtures__/Transfer';
import CompensationModel from '../Models/CompensationModel';

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
    it('should proccess after transfer compensations', async () => {
        const mockUpdate = jest.fn()
        CompensationModel.prototype.update = mockUpdate
        const mock = new PagarmeService()
        await mock.afterTransfer(new MockTransfer(), [])
        expect(mockUpdate).toBeCalledTimes(1)
    })
    it('should proccess after transfer compensations with errors', async () => {
        const errors = [
            { message: 'test' },
            { message: 'Idempotency-Key must be unique' },
            { message: 'Idempotency-Key must be unique' }
        ]
        
        const mockUpdate = jest.fn()
        CompensationModel.prototype.update = mockUpdate
        
        const realGetIdempotencykeyError = PagarmeService.prototype.getIdempotencykeyError
        const mockGetIdempotencykeyError = jest.fn().mockReturnValue(errors)
        PagarmeService.prototype.getIdempotencykeyError = mockGetIdempotencykeyError

        const mock = new PagarmeService()
        
        await mock.afterTransfer(new MockTransfer(), errors)
        
        expect(mockUpdate).toBeCalledTimes(1)
        expect(mockGetIdempotencykeyError).toHaveBeenCalled()
        
        PagarmeService.prototype.getIdempotencykeyError = realGetIdempotencykeyError
    })
    it('should be assible to get the final API endpoint', () => {
        process.env['PAGARME_API_ENDPOINT'] = 'https://test'
        const mock = new PagarmeService()
        const endpoint = mock.getEndpoint()
        expect(endpoint).toEqual(process.env['PAGARME_API_ENDPOINT'])
    })
})