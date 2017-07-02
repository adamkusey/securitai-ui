import * as KerasJS from 'keras-js';
import _ from 'lodash';
import wordDict from '../../assets/word-dictionary.json';

const model = new KerasJS.Model({
  filepaths: {
    model: `${__dirname}/../../assets/model_dev.json`,
    weights: `${__dirname}/../../assets/model_weights_dev.buf`,
    metadata: `${__dirname}/../../assets/model_metadata_dev.json`
  },
  filesystem: true
});

export function predict(logEntry) {
  model.ready()
    .then(() => {
      const maxInputLength = 1024;
      let logToSequence = [];
      let paddedSequence = new Float32Array(maxInputLength).fill(0);

      // Extract and tokenize log contents from word dictionary
      _.forEach(JSON.stringify(logEntry, null, 1).replace(/\n/g,' ').split(' '), (item) => {
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
    .then(outputdata => {
      console.log(outputdata);
    })
    .catch(err => {
      console.log(err);
    })
}
