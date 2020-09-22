import fetch from 'node-fetch'
import Compensation from '../Entities/Compensation';
import Transfer from '../Entities/Transfer';
import CompensationModel from '../Models/CompensationModel';
import TransferModel from '../Models/TransferModel';

export default class PagarmeService {
    private _endpoint: string;

    constructor() {
        this._endpoint = process.env.PAGARME_API_ENDPOINT
    }

    getIdempotencykeyError(data) {
        return data.filter(function(data) {
            return data.message == "Idempotency-Key must be unique"
        });
    }

    // afterTransfer: atualiza os registros no banco de dados
    async afterTransfer(transfer: Transfer, errors?: any){
        let terStatus = "paid";
        let hasError = false;

        if (errors && errors.length > 0) {
            console.log("TER Error: ", errors);
            terStatus = "non-identified-error"
            if (this.getIdempotencykeyError(errors).length > 0) {
                terStatus = "paid";
                hasError = true;
            }
        }

        const Compensation = new CompensationModel()
        await Compensation.update(transfer.compensationId, terStatus)
        
        if (terStatus == "paid" && !hasError) {
            const Transfer = new TransferModel()
            await Transfer.create(transfer)
        }
    }
    
    // postCompensations: envia as compensações para a API da Pagarme e atualiza
    // os registro no banco de dados.
    async postCompensations(compensations?: Compensation[]){
        const endpoint = this.getEndpoint()
        
        const method = 'POST';

        const bodyPayload = {
            source_id: process.env.MAIN_ACCOUNT,
            api_key: process.env.PAGARME_KEY,
        }

        compensations.forEach(async compensation => {
            const { 
                compensationId, 
                compensationOrderId, 
                compensationRecipientId,
                compensationAmount
            } = compensation

            const headers = {
                'Content-Type': 'application/json',
                'Idempotency-Key': compensationId
            };

            const metadata = {
                order_id: compensationOrderId,
                compensation_id: compensationId,
            };

            const body = JSON.stringify({
                ...bodyPayload,
                target_id: compensationRecipientId,
                amount: compensationAmount,
                metadata,
            });
            
            try {
                const result = await fetch(endpoint, { method, headers, body })

                if(!result) {
                    const errorStr = JSON.stringify(result, null, 2)
                    const error = new Error(`TER unexpected Error: ${errorStr}`);
                    throw(error);
                }

                const transfer = new Transfer(result, compensationId)

                await this.afterTransfer(transfer, result.errors);
            } catch (error) {
                const dataStr = JSON.stringify(body, null, 2)
                const errorStr = JSON.stringify(error, null, 2)
                throw(`
    PagarMe Transfer Error - DATA: ${dataStr} - ERROR: ${errorStr}
                `);
            }
        })
    }

    getEndpoint() {
        return this._endpoint
    }
}