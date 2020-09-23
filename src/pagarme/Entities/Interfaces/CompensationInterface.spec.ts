import { mock } from 'jest-mock-extended'
import CompensationInterface from './CompensationInterface'

class Mock implements CompensationInterface {
    compensationId: String;
    compensationRecipientId: String;
    compensationAmount: String;
    compensationOrderId: String;
}

describe('CompensationInterface', () => {
    it('should interface implemented', () => {
        const mockCompensationInterface = mock<CompensationInterface>()
        expect(mockCompensationInterface).toBeDefined()
    })
    it('should implements the `CompensationInterface` interface', () => {
        const mockInterface = new Mock()
        expect(mockInterface).toBeDefined()
    })
})
