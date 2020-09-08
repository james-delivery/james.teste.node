import pagarmeBalanceFixture from '../fixtures/pagarme_balance.json';
import { PagarMe } from '../../src/clients/PagarMe';

describe('Should test PagarMe transfer integration', () => {
  it('should return a pagarme transfer', async () => {
    const pagarMe = new PagarMe();
    const response = await pagarMe.getBalance();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(pagarmeBalanceFixture);
  });

  it('should return a fail pagarme transfer', async () => {
    const pagarMe = new PagarMe();
    const response = await pagarMe.getBalance();

    expect(response.status).toBe(400);
    expect(response.data).toEqual(pagarmeBalanceFixture);
  });
});
