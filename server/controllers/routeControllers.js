import { predictMaliciousRequest } from '../services/predict';
import { getGoodRequests, getBadRequests, getAllRequests } from '../services/store';

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

export const requests = {
  path: '/api/requests',
  method: 'GET',
  handler: (req, res) => {
    res(getAllRequests());
  }
};

export const goodRequests = {
  path: '/api/requests/good',
  method: 'GET',
  handler: (req, res) => {
    res(getGoodRequests());
  }
};

export const badRequests = {
  path: '/api/requests/bad',
  method: 'GET',
  handler: (req, res) => {
    res(getBadRequests());
  }
};
