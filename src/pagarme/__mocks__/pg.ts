const mockQuery = jest.fn().mockResolvedValue(data => jest.fn().mockReturnValue(data))

class MockClient {
    connect = jest.fn().mockReturnValue({
        query: mockQuery,
        end: mockQuery
    })
}
export default {
    Client: jest.fn().mockImplementation(() => (new MockClient()))
}
