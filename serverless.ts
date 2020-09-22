import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'pagarme',
  },
  frameworkVersion: '1',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    stage: process.env.NODE_ENV || 'dev'
  },
  functions: {
    pagarme: {
      handler: './src/pagarme/handler.post',
      events: [
        {
          http: {
            method: 'post',
            path: 'pagarme',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
