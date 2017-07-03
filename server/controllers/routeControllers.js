import { predictMaliciousRequest } from '../services/predict';
import { getGoodRequests, getBadRequests } from '../services/store';

export const root = {
  path: '/api/',
  method: 'GET',
  handler: (req, res) => res('ROOT')
};

export const process = {
  path: '/api/process',
  method: 'POST',
  handler: (req, res) => {
    res(predictMaliciousRequest(req.payload));
  }
};

export const goodRequests = {
  path: '/api/good',
  method: 'GET',
  handler: (req, res) => {
    res(getGoodRequests());
  }
};

export const badRequests = {
  path: '/api/bad',
  method: 'GET',
  handler: (req, res) => {
    res(getBadRequests());
  }
};
