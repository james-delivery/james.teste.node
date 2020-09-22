# Desafio James
Link para a [descrição](TESTREADME.md) do desafio.

## Solução

### Descrição

A solução adotado foi de usar o framework serverless para construir a estrutura
do projeto. Este framework nos fornece ferramentas e padrões para aplicações
serverless que facilitam o dia-a-dia do desenvolverdor, além de ser agnostico ao
serviço cloud utilizado.


### Implementação

Das etapas da implementação:

1. Configuração: a primeira etapa constituiu-se na configuração do serverless
para o projeto;
2. A segunda etapa foi adequar a estrutura de arquivos e pastas para o melhor 
padrão de projeto serverless;
3. A terceira etapa constituiu-se da refatoração do código legado do desafio para
se adaptar ao serverless;
4. A quarta etapa foi a escrita dos testes unitários do projeto e cobertura de 
código;
5. A quinta e última etapa foi a documentação de tudo que foi feito no desafio.

### Como executar o projeto

#### Dev

Para executar o projeto em modo de desenvolvimento primeiro é necessário instalar
as dependências. Use o `npm` ou o `yarn` para isntalar os pacotes do projeto:

`npm install`

Em seguida, já é possível executar o projeto localmente:

`npm run start`

### Prod

Para executar o projeto em ambiente de produção é necessário fazer o deploy da 
função para um serviço cloud com AWS ou GSP. O Serverless nos fornece uma boa
[documentação](https://www.serverless.com/framework/docs/providers/aws/guide/deploying/) de como configurar o [deploy](https://www.serverless.com/framework/docs/providers/aws/guide/deploying/) em diferentes ambientes cloud.

### Testes

Para executar os testes basta rodar o comando:

`npm run test`

Ele executar os testes unitários do projeto que são executados utilizando a 
lib [Jest](https://jestjs.io/en/).
Podemos, ainda, executar os testes com relatório de cobertura de linhas de código:
`npm run test:cov`

### Cobertura de Código

```bash
All files                    |   96.09 |    83.33 |     100 |   96.09 |                   
 pagarme                     |     100 |      100 |     100 |     100 |                   
  handler.ts                 |     100 |      100 |     100 |     100 |                   
 pagarme/Entities            |     100 |      100 |     100 |     100 |                   
  Compensation.ts            |     100 |      100 |     100 |     100 |                   
  Metadata.ts                |     100 |      100 |     100 |     100 |                   
  Transfer.ts                |     100 |      100 |     100 |     100 |                   
 pagarme/Entities/Interfaces |       0 |      100 |     100 |       0 |                   
  MetadataInterface.ts       |       0 |      100 |     100 |       0 | 1                 
  TransferInterface.ts       |       0 |      100 |     100 |       0 | 3                 
 pagarme/Models              |     100 |    83.33 |     100 |     100 |                   
  CompensationModel.ts       |     100 |       50 |     100 |     100 | 21                
  DbConnection.ts            |     100 |      100 |     100 |     100 |                   
  TransferModel.ts           |     100 |      100 |     100 |     100 |                   
 pagarme/Services            |   92.68 |    83.33 |     100 |   92.68 |                   
  PagarmeService.ts          |   92.68 |    83.33 |     100 |   92.68 | 81-83             
 pagarme/__fixtures__        |     100 |      100 |     100 |     100 |                   
  Compensations.ts           |     100 |      100 |     100 |     100 |                   
  Transfer.ts                |     100 |      100 |     100 |     100 |                   
-----------------------------|---------|----------|---------|---------|-------------------
Test Suites: 10 passed, 10 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Time:        8.086 s
Ran all test suites.
```