import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import CompensationModel from './Models/CompensationModel'
import PagarmeService from './Services/PagarmeService'

// Método post é executado quando a função recebe uma request.
export const post: APIGatewayProxyHandler = async () => {
  const Compensation = new CompensationModel()
  const Pagarme = new PagarmeService()

  try {
    // Busca todas as "Compensatrions" do banco que possuem um status de 
    // 'waiting_payment' num intervalo de 6 horas a partir da data "expected_payment_date"
    const compensations = await Compensation.getAll()
    
    const compensationsStr = JSON.stringify(compensations, null, 2);

    console.log("Returned compensations: ", compensationsStr);

    // Envia as compensaçõe spara a API da Pagarme e atualiza os registro no 
    // banco
    await Pagarme.postCompensations(compensations)

    const statusCode = 200
    
    const body = JSON.stringify({
        finished: true
    })

    return { statusCode, body };
  } catch (error) {
    const statusCode = 500
    
    const body = JSON.stringify({
        finished: false,
        error
    }, null, 2)

    return { statusCode, body };
  }
}
