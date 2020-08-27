# James - Teste para vaga de Node.js Developer

## Regras

 - O teste deve ser entregue em no máximo 1 semana e deve seguir a stack: Typescript ou ES6 e Node.js 10.x ou maior.
 - O tempo estimado para realização do teste de forma tranquila são 3 horas.
 - Pode utilizar qualquer framework que julgar interessante.

## Contexto

O código do arquivo test.js é responsável por fazer pagamentos que foram programados para uma data específica. Esses pagamentos que devem ser realizados estão armazenados na tabela compensations no formato id | recipient_id | amount | expected_payment_date | payment_date | status| created_at | updated_at.
Cada campo da tabela compensations:
* id - identificador único da compensation;
* recipient_id - código de identificação do recebedor junto ao Gateway, que no caso desse teste é o Pagar.me;
* amount - valor em centavos que deve ser pago para o recebedor em centavos;
* expected_payment_date - data em que o pagamento deve ser realizada; 
* payment_date - data em que o pagamento foi de fato realizado;
* status - pode variar entre "waiting_payment" e "paid";
Após a compensação ser paga, o serviço atualiza os campos status e payment_date e posteriormente insere uma nova linha na tabela transfers, conforme é possível observar no código;

## Desafio

Refatorar (ou não, caso não julgue necessário) o código do arquivo test.js. 
Escrever os testes que julgar necessário. 
Por se tratar de um serviço de pagamento, garantir que esse serviço seja o mais confiável possível. 
Para que seja possível identificarmos quais pontos você levou em consideração ao reescrever o código, faça os comentários no PR ou no próprio código.

## Diferenciais
 - DDD
 - Typescript

## Como entregar?

Ao finalizar o teste, reveja o código e crie um Pull Request para este repositório.

## Dúvidas?

michella@jamesdelivery.com.br
