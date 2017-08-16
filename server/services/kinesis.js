import stream from 'stream';
import kinesis from 'kinesis';
import { predictMaliciousRequest } from './predict';

export function consume() {
  const kinesisSource = kinesis.stream({
    name: 'SecuritAILogs',
    region: 'us-east-2',
    maxRetries: 6,
    initialRetryMs: 10000
  });

  let modelOutput = new stream.Writable({
    objectMode: true
  });

  modelOutput._write = (data, enc, cb) => {
    if (data.Data) {
      const logBuffer = Buffer.from(data.Data, 'base64');
      predictMaliciousRequest(logBuffer.toString('utf-8'));
      cb();
    }
  };

  kinesisSource.pipe(modelOutput);
}
