class Payment{
    constructor({
        id,compensation_id,created_at ,updated_at , amount ,pagarme_transfer_id ,reference_id ,source_id ,target_id,status,funding_date,funding_estimated_date,date_created,date_updated,reference_type
    }){
        this.id = id,
        this.created_at = created_at,
        this.updated_at = updated_at,
        this.amount = amount,
        this.pagarme_transfer_id = pagarme_transfer_id,
        this.reference_id = reference_id,
        this.source_id = source_id,
        this.target_id = target_id,
        this.status = status,
        this.funding_date = funding_date,
        this.funding_estimated_date = funding_estimated_date,
        this.date_created = date_created,
        this.date_updated = date_updated,
        this.reference_type = reference_type
    }
}

module.exports = Payment