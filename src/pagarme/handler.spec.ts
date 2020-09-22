import { post } from './handler';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import CompensationModel from './Models/CompensationModel';
import PagarmeService from './Services/PagarmeService'
import data from './__fixtures__/Compensations';

jest.mock('aws-lambda', () => ({
    APIGatewayProxyResult: jest.fn()
}))

describe('Handler', () => {
    it('should handle a post request and return 200 with correct body', 
        async (done, event?: APIGatewayProxyEvent, ctx?: Context) => {
        const getClient = CompensationModel.prototype.getClient
        CompensationModel.prototype.getClient = jest.fn().mockResolvedValue({
            query: jest.fn().mockResolvedValue({ rows: data }),
            end: () => {}
        });
        const postCompensations = PagarmeService.prototype.postCompensations;
        const mockPostCompensations = jest.fn()
        PagarmeService.prototype.postCompensations = mockPostCompensations

        const response = await post(event, ctx, jest.fn());
        
        const expected = { statusCode: 200, body: '{"finished":true}' }
        expect(response).toEqual(expected)
        expect(mockPostCompensations).toHaveBeenCalled()
        
        CompensationModel.prototype.getClient = getClient
        PagarmeService.prototype.postCompensations = postCompensations
        
        done()
    })
    it('should handle a post request and return 500 with error body', 
        async (done, event?: APIGatewayProxyEvent, ctx?: Context) => {
        const response = await post(event, ctx, jest.fn());
        const expected = { statusCode: 500,
            body: '{\n  "finished": false,\n  "error": {}\n}' }
        expect(response).toEqual(expected)
        done()
    })
})