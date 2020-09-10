/* eslint-disable camelcase */
class Compensation {
  id: string;

  order_id: string;

  recipient_id: string;

  amount: number;

  expected_payment_date: number;

  status: 'waiting_payment' | 'paid';

  constructor(props: Compensation) {
    this.id = props.id;
    this.order_id = props.order_id;
    this.recipient_id = props.recipient_id;
    this.amount = props.amount;
    this.expected_payment_date = props.expected_payment_date;
    this.status = props.status;
  }
}

export default Compensation;
