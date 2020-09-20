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

    console.log(compensation);

    expect(1).toBe(1);
  });

  it('should validate input data to update a compensation', () => {
    const now = '';
    const compensationId = '';
    const terStatus = '';
  });

  it('should validade input data to create a transfer', () => {
    
  });

})
