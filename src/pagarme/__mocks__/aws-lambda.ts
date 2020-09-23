class APIGatewayProxyResult {
    statusCode: Number
    body: String
}

export default {
    APIGatewayProxyHandler: jest.fn(),
    APIGatewayProxyEventBase: jest.fn(),
    Context: jest.fn(),
    APIGatewayProxyResult 
}
