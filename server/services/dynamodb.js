import dynamo from 'dynamodb';
import joi from 'joi';

dynamo.AWS.config.update({region: "us-east-2"});
const modelName = 'securitai-blacklist-ip'
const BlacklistIp = dynamo.define(modelName, {
  hashKey: 'ip',
  timestamps: true,
  schema: {
    ip: joi.string()
  }
});

export function insertBlacklistIp(ip) {
  dynamo.createTables({
    modelName: {
      readCapacity: 5,
      writeCapacity: 5
    }
  }, function (err) {
    if (!err) {
      BlacklistIp.create({ip: ip});
    }
  });
}
