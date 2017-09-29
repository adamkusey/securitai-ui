## securitai-ui

SecuritAI UI application provides a platform to monitor for malicious requests from a stream of request logs. The prediction model is powered by Recurrent Neural Network developed with Keras as explained in [Detecting Malicious Requests Using Keras & Tensorflow](https://medium.com/slalom-engineering/detecting-malicious-requests-with-keras-tensorflow-5d5db06b4f28)

#### Start dev and watch
npm run start:dev

#### Requirements
- Node 6.11.0+
- AWS Kinesis Permissions

#### Keras
An LSTM RNN model is provided under assets/ for keras-js to load up and perform predictions. This can be swapped out for any applicable model of choice

#### React UI
React & Redux

#### Kinesis Stream
Data is consumed from an AWS Kinesis stream to be processed by the RNN. A sequence number should be maintained to keep track of records consumed in the stream.
