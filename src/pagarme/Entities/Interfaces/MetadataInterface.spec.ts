import { mock } from 'jest-mock-extended'
import MetadataInterface from './MetadataInterface'

class Mock implements MetadataInterface {
    orderId: String;
}

describe('MetadataInterface', () => {
    it('should interface implemented', () => {
        const mockMetadataInterface = mock<MetadataInterface>()
        expect(mockMetadataInterface).toBeDefined()
    })
    it('should implements the `MetadataInterface` interface', () => {
        const mockInterface = new Mock()
        expect(mockInterface).toBeDefined()
    })
})
