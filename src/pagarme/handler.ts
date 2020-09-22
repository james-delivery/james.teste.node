import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import CompensationModel from './Models/CompensationModel'
import PagarmeService from './Services/PagarmeService'

export const post: APIGatewayProxyHandler = async (event, _context) => {
  const Compensation = new CompensationModel()
  const Pagarme = new PagarmeService()

  try {
    const compensations = await Compensation.getAll()
  
    const compensationsStr = JSON.stringify(compensations, null, 2);

    console.log("Returned compensations: ", compensationsStr);

    await Pagarme.postCompensations(compensations)

    const statusCode = '200'
    
    const body = JSON.stringify({
        finished: true
    })

    return { statusCode, body };
  } catch (error) {
    const statusCode = '500'
    
    const body = JSON.stringify({
        finished: false,
        error
    }, null, 2)

    return { statusCode, body };
  }
}
