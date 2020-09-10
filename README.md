# Lambda function to process pagarme transactions

TODO! Description

## Env vars

TODO!

## How run tests:

### Requirements:

Node.js v10+ installed or compatible docker image like amaysim/serverless:1.72.0

### step by step: 

- Clone this repository
- Run npm install
- Run npm test

## Stack:

- Node.js v10+
- Typescript
- Serverless framework
- node pg module
- Jest

## How to run tests localy


## Usefull commands:

### Run tests with docker:

```sh
docker run -v $(pwd):/opt/app --rm amaysim/serverless:1.72.0 npm test
```

### Base command to run serverless in docker without Node.js installed in local machine:

```sh
docker run -v $(pwd):/opt/app --rm amaysim/serverless:1.72.0 sls
```

### Run serverless command with params:

```sh
docker run -v $(pwd):/opt/app --rm amaysim/serverless:1.72.0 sls --help
```

### Install one npm module
```sh
docker run -v $(pwd):/opt/app --rm amaysim/serverless:1.72.0 npm install --save-dev pg
```

## Atenção esse repositório é apenas o resultado de um teste de desenv, não deve ser usado como uma aplicação real!




