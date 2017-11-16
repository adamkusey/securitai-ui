# SecuritAI UI

SecuritAI UI application provides a platform to monitor for malicious requests from a stream of request logs. The prediction model is powered by Recurrent Neural Network developed with Keras as explained in [Detecting Malicious Requests Using Keras & Tensorflow](https://medium.com/slalom-engineering/detecting-malicious-requests-with-keras-tensorflow-5d5db06b4f28).

# Set-up
The following sections are related to setting up the software.

## Requirements
This software has the following requirements:

- Node 6.11.0+
- AWS Kinesis Permissions

## AWS Kinesis Permissions
You will have to setup your local machine to be able to authenticate against your AWS account.
Here are some instructions: http://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html

# Running the software
You can run the software with the following steps:

1. clone this repository
2. activate your *AWS account credentials* environment variables
3. cd into the project folder
4. run `npm run start`

# Implementation details
This software is built with the following components:

- Keras (LSTM RNN)
- React
- Kinesis

### Keras
An LSTM RNN model is provided under assets/ for keras-js to load up and perform predictions. This can be swapped out for any applicable model of choice

### React UI
React & Redux

### Kinesis Stream
Data is consumed from an AWS Kinesis stream to be processed by the RNN. A sequence number should be maintained to keep track of records consumed in the stream.

# Development
The following sections are primarily related to setting up a development environment.

## Start dev and watch
When you are ready to start development, you can run:

```
npm run start:dev
```
