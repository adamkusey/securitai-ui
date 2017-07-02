require('babel-core/register');
require('./server/server');

const predict = require('./server/services/predict');
require('./server/services/kinesis').consume(predict.predictMaliciousRequest);
