const {
    readFile, read, writeFile
} = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

// outra forma de obter dados do json
const dadosJsonCompensacoes = require('./compensations.json')
const dadosJsonTransferencias = require('./transferencias.json')
const { parse } = require('path')


class Database{

    constructor(){
        this.NOME_ARQUIVO_COMPENSACOES = 'compensations.json' //ARQUIVO QUE CONTEM AS COMPENSAÇÕES
        this.NOME_ARQUIVO_TRANSFERENCIAS = 'transferencias.json' //ARQUIVO QUE CONTÉM AS TRANSFERENCIAS
    }

    async obterDadosArquivo(ARQ){
        const arquivo = await readFileAsync(ARQ,'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(ARQ,dados){
        await writeFileAsync(ARQ, JSON.stringify(dados))
        return true
    }

    async listar(){ //MÉTODO PARA LISTAR COMPENSAÇÕES PENDENTES
        const dados = await this.obterDadosArquivo(this.NOME_ARQUIVO_COMPENSACOES)
        const dadosFiltrados = dados.filter(item => item.status === 'waiting_payment')        
        return dadosFiltrados
    }

    async callTransferir(){

        const dados = await this.obterDadosArquivo(this.NOME_ARQUIVO_COMPENSACOES)
        
        var len = dados.length;

        for(let i = 0; i < 1; i++) { //LIMITE DE REQUISIÇÕES
            this.transferir(dados[i])
        }

        return true

    }

    async transferir(item){

        const idReg = Date.now()
        
        var today = new Date();    
        var dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');        
        
        const listaTransferencias = await this.obterDadosArquivo(this.NOME_ARQUIVO_TRANSFERENCIAS)

        const compensacao = {
            id:idReg,
            created_at:dateTime,
            updated_at:dateTime,
            amount:item.amount,
            pagarme_transfer_id:item.id,
            reference_id:item.id,
            source_id:item.id,
            target_id:item.id,
            status:'completed_payment',
            funding_date:dateTime,
            funding_estimated_date:item.id,
            date_created:dateTime,
            date_updated:dateTime,
            reference_type:item.id
        }

        
        //ATUALIZA ARRAY COM AS TRANSFERENCIAS
        const dadosTransferencia = [
            ...listaTransferencias,
            compensacao
        ]
    
        
        const resultado = await this.escreverArquivo(this.NOME_ARQUIVO_TRANSFERENCIAS,dadosTransferencia) //ESCREVE NO ARQUIVO
        
        if(resultado){
            const dados = await this.obterDadosArquivo(this.NOME_ARQUIVO_COMPENSACOES)
            const dadosFiltrados = dados.filter(f => f.id === item.id)
            this.atualizar(dados, dadosFiltrados[0])  //ATUALIZA STATUS E DATA DA COMPENSAÇÃO EXECUTADA
        }

        return true
        
    }

    async atualizar(todosDados,modificacoes){

        var dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');                
        const dadosAtual = modificacoes;

        dadosAtual.status = 'completed_payment';
        dadosAtual.payment_date  = dateTime;
        
        console.log(`DADOS: `, dadosAtual)


        //ATUALIZA O ARQUIVO DE COMPENSAÇÕES
        await this.escreverArquivo(this.NOME_ARQUIVO_COMPENSACOES,[
            ...todosDados,
            dadosAtual
        ])


    }

}

module.exports = new Database()