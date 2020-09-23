import DBConnection from './DbConnection'
import Compensation from '../Entities/Compensation'

export default class CompensationModel extends DBConnection{
    private _client;

    constructor() {
        super()
        this._client = this.connect()
    }
    
    async getClient(){
        return this._client
    }

    async getAll(){
        const client = await this.getClient()

        const todayEndDt = new Date(new Date().setHours(23, 59, 59))

        if (todayEndDt.getDay() == 2) {
            todayEndDt.setDate(todayEndDt.getDate() + 1)
        }

        const todayEnd = todayEndDt.toISOString()

        const todayInitDt = new Date(new Date().setHours(0, 0, 0))
        const todayInit = todayInitDt.toISOString()

        const { rows } = await client.query(`
        SELECT DISTINCT ON (c.id)
            c.order_id AS order_id,
            c.id AS compensation_id,
            c.amount AS compensation_amount,
            c.status AS compensation_status,
            c.expected_payment_date AS compensation_expected_payment_date,
            c.pagarme_recipient_id AS compensation_recipient_id
        FROM compensations c
            WHERE c.amount > 0
                AND c.status = 'waiting_payment'
                AND c.expected_payment_date - interval '3 hours' >= $1
                AND c.expected_payment_date - interval '3 hours' <= $2
        ORDER BY c.id
        LIMIT 70;`, [todayInit, todayEnd])

        await client.end()

        return rows.map(row => {
            return new Compensation(row)
        })
    }

    async update(compensationId, terStatus){
        const client = await this.getClient()

        const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        
        const query = `
        update compensations 
        set status = ${terStatus}, payment_date = ${now}, updated_at = ${now} 
        where id = ${compensationId}`

        const { rows } = await client.query(query)

        await client.end()

        return rows.map(row => {
            return new Compensation(row)
        })
    }
}
