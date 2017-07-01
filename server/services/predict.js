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
      let fitToSequence = new Float32Array(maxInputLength).fill(0);
      _.forEach(JSON.stringify(logEntry, null, 1).split(' '), (item, index) => {
        const key = item.toLowerCase();
        fitToSequence[maxInputLength-1 - index] = wordDict[key] ? wordDict[key] : 0;
      });
      // for (let i = maxInputLength; i > 940; i--) {
      //   console.log(fitToSequence[i]);
      // }
      return model.predict({
        'input': fitToSequence
      });
    })
    .then(outputdata => {
      console.log(outputdata);
    })
    .catch(err => {
      console.log(err);
    })
}
