import CompensationRepository from "./repositories/CompensationRepository"
import {sendToPagarme} from './Providers/Pagarme';

export default  async function handler(event: any){
  const compensationRepository = new CompensationRepository();
  const compensationsAll = await compensationRepository.fetchDatabase();

  compensationsAll.map(async compensation => {
    await sendToPagarme(compensation); 
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
        finished: true
    }),
    headers: {
        'Content-Type': 'application/json',
    },
  };
}
