import CompensationInterface from './Interfaces/CompensationInterface'

export default class Compensation implements CompensationInterface {
    compensationId: String;
    compensationRecipientId: String;
    compensationAmount: String;
    compensationOrderId: String;
    
    constructor(data?: Object){
        this.compensationId = data['compensation_id'];
        this.compensationRecipientId = data['compensation_recipient_id'];
        this.compensationAmount = data['compensation_amount']
        this.compensationOrderId
    }
}