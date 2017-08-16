let AWS = require('aws-sdk');

export function pushSNSMessage(msg) {
  const snsRegion = process.env.sns_region;
  const snsArn = process.env.sns_arn;

  if (!snsArn || !snsRegion) {
    console.log('sns env variables are not defined');
    return;
  }

  const sns = new AWS.SNS({
    region: snsRegion
  });

  const params = {
    TopicArn: snsArn,
    Message: msg
  };

  sns.publish(params, (err, data) => {
    if (!err) {
      return data;
    } else {
      throw(err);
    }
  });
}
