import { Handler, Context, Callback } from 'aws-lambda';
import CompensationRepository from './repositories/CompensationRepository';
import PagarMeService from './services/PagarMeService';

export const process: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  const compensationRepository = new CompensationRepository();
  const compensations = await compensationRepository.getAll();

  const promises = compensations.map(async (compensation) => {
    await PagarMeService.sendCompensation(compensation);
  });
  await Promise.all(promises);

  return {
    statusCode: '200',
    body: JSON.stringify({
      finished: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
