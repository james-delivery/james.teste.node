import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from './src/service';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const result = await service(event);
  return result;
}
