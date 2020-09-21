//criar pagamento
const { Compensation } = require('../../src/app/models');

describe('Creating a compensation', () => {
  it('should create a compensation', async () => {
    const compensation = await Compensation.create({
      order_id: '1',
      amount: 100,
      status: 'A',
      expected_payment_date: '2020-09-25',
      pagarme_recipient_id: '1'
    });
    let idRetrieved = await compensation.id;
    
    expect(idRetrieved).toBeGreaterThan(0);
  });

  it('should validate input data to update a compensation', () => {
    //regras para validação dos campos da tabela compensation
  });

  it('should validade input data to create a transfer', () => {
    //regras para validação dos campos da tabela transfer
  });

})
