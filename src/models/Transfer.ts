/* eslint-disable camelcase */
export default class Transfer {
  pagarme_transfer_id: string;

  created_at: Date;

  updated_at: Date;

  amount: number;

  order_id: string;

  source_id: string;

  target_id: string;

  status: 'waiting_payment' | 'paid';

  funding_date: Date;

  funding_estimated_date: Date;

  date_created: Date;

  date_updated: Date;

  reference_type: 'Order';

  constructor(props: Transfer) {
    this.pagarme_transfer_id = props.pagarme_transfer_id;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
    this.amount = props.amount;
    this.order_id = props.order_id;
    this.source_id = props.source_id;
    this.target_id = props.target_id;
    this.status = props.status;
    this.funding_date = props.funding_date;
    this.funding_estimated_date = props.funding_estimated_date;
    this.date_created = props.date_created;
    this.date_updated = props.date_updated;
    this.reference_type = props.reference_type;
  }
}
