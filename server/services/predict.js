import * as KerasJS from 'keras-js';
import _ from 'lodash';
import { storePrediction } from './store';

const config = process.env.PROD ? require('../config/prod') : require('../config/dev');

const wordDict = require(config.wordDict);
const model = new KerasJS.Model({
  filepaths: {
    model: config.model,
    weights: config.weights,
    metadata: config.metadata
  },
  filesystem: true
});

export function predictMaliciousRequest(requestLog) {
  model.ready()
    .then(() => {
      const maxInputLength = 1024;
      let logToSequence = [];
      let paddedSequence = new Float32Array(maxInputLength).fill(0);
      let parsedLog = JSON.parse(requestLog);

      // Extract and tokenize log contents from word dictionary
      _.forEach(JSON.stringify(parsedLog, null, 1).replace(/\n/g,' ').split(' '), (item) => {
        const key = item.toLowerCase();
        if (wordDict[key]) {
          logToSequence.push(wordDict[key]);
        }
      });

      // Fit log sequence to paddedSequence
      for (let i = logToSequence.length; i > -1; i--) {
        const revPos = paddedSequence.length - (logToSequence.length - i);
        paddedSequence[revPos] = logToSequence[i];
      }

      return model.predict({
        'input': paddedSequence
      });
    })
    .then(prediction => {
      if (_.size(prediction.output) > 0) {
        console.log(`Malicious request confidence: ${(prediction.output[0] * 100).toFixed(2)}%`);
        storePrediction(parsedLog, prediction.output[0]);
      }
    })
    .catch(err => {
      console.log(err);
    })
}
