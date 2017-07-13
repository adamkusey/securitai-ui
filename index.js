require('babel-core/register');
require('./server/server');
require('./server/services/kinesis').consume();
