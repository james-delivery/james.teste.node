import SendToPagarMeService from './services/SendToPagarMeService';
import CompensationsRepository from './repositories/Compensations/CompensationsRepository';
import TransferRepository from './repositories/Transfers/TransferRepository';

export async function transfersHandler (event: any) {
  try {
    const compensationsRepository = new CompensationsRepository();
    const transferRepository = new TransferRepository();
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    let todayInit = new Date(new Date().setHours(0, 0, 0));
    let todayEnd = new Date(new Date().setHours(23, 59, 59));
        if (todayEnd.getDay() === 2) {
            todayEnd.setDate(todayEnd.getDate() + 1);
        }

    const compensationsData = await compensationsRepository.all(todayInit, todayEnd);
    const sendToPagarMe = new SendToPagarMeService(transferRepository, compensationsRepository);

    compensationsData.map(async compensation => {
      await sendToPagarMe.execute(compensation,now)
    });

    return {
      statusCode: '200',
      body: JSON.stringify({
        finished: true
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

  } catch (error) {
    return {
      statusCode: '400',
      body: JSON.stringify({
        error: true,
        details: error.message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }
}

