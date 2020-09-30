class Compensation{
    constructor({
        id ,recipient_id , amount ,expected_payment_date ,payment_date ,status 
    }){
        this.id = id,
        this.recipient_id = recipient_id,
        this.amount = amount,
        this.expected_payment_date = expected_payment_date,
        this.payment_date = payment_date,
        this.status = status
    }
}

module.exports = Compensation