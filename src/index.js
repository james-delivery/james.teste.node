require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const handlerJames = require('./test');

console.log('antes');
handlerJames.handler('teste');
console.log('depois');