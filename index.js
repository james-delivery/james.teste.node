const Commander = require('commander')

async function main(){

    Commander
        .version('v1')
        .option('-l, --listar', "Listar Pagamentos")        
        .option('-t, --transferir', "Transferir Pagamentos")        
        .parse(process.argv)

    const heroi = new Heroi(Commander)

    try {

        
        if(Commander.listar){            
            
            console.log("Listar")
            return;
        }

        if(Commander.transferir){
            console.log("Transferir")

        }

        
    } catch (error) {
        console.error(`DEU RUIM`, error)
    }

}

main()