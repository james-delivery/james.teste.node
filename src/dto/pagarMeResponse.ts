export class PagarMeResponse {
  amount: number;
  id: String;
  order_id: String;
  source_id: String;
  target_id: String;
  status: String;
  funding_date: Date;
  funding_estimated_date: Date;
  date_created: Date;
  date_updated: Date;

  constructor(
    amount: number,
    id: String,
    order_id: String,
    source_id: String,
    target_id: String,
    status: String,
    funding_date: Date,
    funding_estimated_date: Date,
    date_created: Date,
    date_updated: Date
  ) {
    this.amount = amount;
    this.id = id;
    this.order_id = order_id;
    this.source_id = source_id;
    this.target_id = target_id;
    this.status = status;
    this.funding_date = funding_date;
    this.funding_estimated_date = funding_estimated_date;
    this.date_created = date_created;
    this.date_updated = date_updated;
  }
}
