# Lambda function to process pagarme transactions



## Stack:

- Node.js v10+
- Serverless framework

## How to run tests localy


## Usefull commands:

### With docker:

```sh
docker run -v $(pwd):/opt/app --rm amaysim/serverless:1.72.0 ????
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
docker run -v $(pwd):/opt/app --rm amaysim/serverless:1.72.0 npm install --save-dev serverless-mocha-plugin
```

