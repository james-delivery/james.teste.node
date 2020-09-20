const { Compensation } = require('./app/models');


for (let index = 2; index <= 100; index++) {
    Compensation.create({
    order_id: index,
    amount: 100 + index,
    status: 'A',
    expected_payment_date: '2020-09-25',
    pagarme_recipient_id: index
  })
}
