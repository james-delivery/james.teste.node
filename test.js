const {
    deepEqual,
    ok

} = require('assert')


const database = require('./database')

DEFAULT_ITEM_CADASTRAR = {
    id:1594035837570,
    recipient_id:123456,
    amount:1243.99,
    expected_payment_date:"2020-09-30",
    payment_date:null,
    status:"waiting_payment"
}

describe('Suite de manipulação de Pagamentos', () =>{


    before(async function(){
        await database.listar()
        await database.callTransferir()
    })
    
    /*it.only('Deve executar listagem geral das compensações', async  function(){
        
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar()                
        deepEqual(resultado, expected)
        //console.log([resultado])
    })*/


    
    it.only('Deve executar transferencia das compensações', async  function(){
        
        const expected = true        
        const resultado = await database.callTransferir()        
        deepEqual(resultado, expected)
        //console.log([resultado])
    })


})