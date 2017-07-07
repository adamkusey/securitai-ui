import AWS from 'aws-sdk';
import uuidv4 from 'uuid/v4';
import { waterfall } from 'async';
import fs from 'fs';

AWS.config.update({region: 'us-east-2'});

const kinesis = new AWS.Kinesis();
const StreamName = 'SecuritAILogs';
const KINESIS_POINTER_FILE = 'kinesisPointer';
const RETRY_TIME_IN_SECONDS = 1;
const RETRY_TIME_IN_MS = RETRY_TIME_IN_SECONDS * 1000;

let shardId;

export const write = (data) => {
    const sensor = uuidv4();
    const params = {
        Data: JSON.stringify(data), /* required */
        PartitionKey: sensor, /* required */
        StreamName
    };
    kinesis.putRecord(params, () => {});
};

function createKinesisPointer() {
    if (!fs.existsSync(KINESIS_POINTER_FILE)) {
        fs.openSync(KINESIS_POINTER_FILE, 'w');
    }
}

function getShardId(callback) {
    if (shardId) {
        callback(null, shardId);
    } else {
        kinesis.describeStream({ StreamName }, (err, data) => {
            const shardId = data.StreamDescription.Shards[0].ShardId;
            err ? callback(err) : callback(err, shardId)
        });
    }
}

function getShardIterator(ShardId, callback) {
    const StartingSequenceNumber = fs.readFileSync(KINESIS_POINTER_FILE).toString('utf8') || undefined;
    const shardParams = {
        ShardId,
        StreamName,
        ShardIteratorType: StartingSequenceNumber ? 'AFTER_SEQUENCE_NUMBER' : 'TRIM_HORIZON',
        StartingSequenceNumber
    };
    kinesis.getShardIterator(shardParams, (err, shard) => {
        err ? callback(err) : callback(err, shard.ShardIterator);
    });
}

function getRecord(ShardIterator, callback) {
    const params = {
        ShardIterator,
        Limit: 1
    };
    kinesis.getRecords(params, (err, data) => {
        if (err) {
            callback(err);
        } else {
            if (data.Records.length) {
                const record = data.Records[0];
                fs.writeFileSync(KINESIS_POINTER_FILE, record.SequenceNumber);
                callback(err, {
                    data: JSON.parse(record.Data.toString("utf8")),
                    next: data.NextShardIterator
                });
            } else {
                callback(true);
            }
        }
    });
}

function fetchRecords(iterator, callback) {
    getRecord(iterator, (err, rec) => {
        if (!err) {
            callback(err, rec.data);
            fetchRecords(rec.next, callback);
        } else {
            callback(err);
        }
    });
}

export function consume(callback) {
    createKinesisPointer();
    waterfall([
        getShardId,
        getShardIterator
    ], (err, iterator) => {
        if (!err) {
            fetchRecords(iterator, (err, rec) => {
                if (err) {
                    setTimeout(() => consume(callback), RETRY_TIME_IN_MS);
                } else {
                    callback(rec);
                }
            });
        } else {
            setTimeout(() => consume(callback), RETRY_TIME_IN_MS);
        }
    });
}
