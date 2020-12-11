'use strict';
require('dotenv').config();

require ('@babel/register');
require('@babel/polyfill');

const main = require('./server/main');

main();