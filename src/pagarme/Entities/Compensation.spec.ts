import Compensation from './Compensation'

const mockDefine = () => {
    new Compensation()
}

describe('Compensation', () => {
    it('should define a `Compensation`', () => {
        const mockData = jest.fn().mockImplementation(() => {})
        const mock = new Compensation(mockData)
        expect(mock).toBeDefined()
    })
    it('should define a `Compensation` passing no data and getting an error', () => {
        expect(mockDefine).toThrow(TypeError)
    })
})
