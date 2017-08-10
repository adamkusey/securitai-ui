import dynamo from 'dynamodb';
import joi from 'joi';
import uuidv4 from 'uuid/v4';

dynamo.AWS.config.update({region: "us-east-2"});
const blacklistIpTable = 'securitai-blacklist-ip';
const retrainTable = 'securitai-retrain-sample';

const blacklistIpModel = dynamo.define(blacklistIpTable, {
  hashKey: 'ip',
  timestamps: true,
  schema: {
    ip: joi.string()
  }
});

const retrainListModel = dynamo.define(retrainTable, {
  hashKey: 'id',
  timestamps: true,
  schema: {
    id: joi.string(),
    entry: joi.object(),
    label: joi.number().integer().min(0).max(1)
  }
})

export function insertBlacklistIp(ip) {
  return dynamo.createTables({
    blacklistIpTable: {
      readCapacity: 5,
      writeCapacity: 5
    }
  }, function (err) {
    if (!err) {
      blacklistIpModel.create({ip: ip});
    }
  });
}

export function insertRetrainEntry(logEntry, isMalicious) {
  return dynamo.createTables({
    retrainTable: {
      readCapacity: 5,
      writeCapacity: 5
    }
  }, function (err) {
    if (!err) {
      retrainListModel.create({
        id: uuidv4(),
        entry: logEntry,
        label: isMalicious ? 1 : 0
      });
    }
  })
}
