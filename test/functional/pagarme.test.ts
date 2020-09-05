import nock from 'nock';
import pagarmeBalanceFixture from '../fixtures/pagarme_balance.json';
import { PagarMe } from '../../src/clients/PagarMe';

describe('PagarMe transfer funcitonal test', () => {
  it('should return a pagarme transfer', async () => {
    const pagarMe = new PagarMe();
    const response = await pagarMe.getBalance();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(pagarmeBalanceFixture);
  });
});
