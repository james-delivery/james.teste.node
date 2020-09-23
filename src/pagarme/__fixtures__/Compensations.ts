import Compensation from '../Entities/Compensation'

const compensationData = {
    'compensation_id': jest.fn(),
    'compensation_recipient_id': jest.fn(),
    'compensation_amount': jest.fn(),
    'order_id': jest.fn()
}

const data = [
    new Compensation(compensationData),
    new Compensation(compensationData),
    new Compensation(compensationData)
]

export default data