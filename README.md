# James - Teste para vaga de Node.js Developer : Proposta de arquitetura

## Proposta de melhoria

Seguem abaixo alguns pontos desenvolvidos no projeto, com o propósito de tornar a solução mais desacoplada e criando responsabilidades únicas.

-   Foram levados em consideração alguns pontos do SOLID, como Single Responsibility Principle, Liskov Substitution Principle e Dependency Inversion Principle.
-   O serviço de integração com o Pagar.me ficou na pasta shared pois tem o objetico de ser um módulo compartilhado com toda a aplicação, mesmo que a princípio esteja sendo utilizada apenas para a execução da tranferência.
-   Utilizei o TypeORM para que caso seja necessário no futuro realizar a mudança do banco de dados, não haverá grande impacto na aplicação, já que o serviço de compensação não visualiza a comunicação direta com o banco, e sim com a interface que o repositório deve implmentar (Injeção de dependência)
-   Para garantir a segurança do acesso a execução da função, foi implemenado no middleware a autenticação do token de acesso.
-   Também foi utilizado o teste de validação se está sendo concluido o processo de realização da transferência.
-   Para o gerenciamento das tabelas do banco de dados (Criação e Edição das colunas), utilizei as migrations.
