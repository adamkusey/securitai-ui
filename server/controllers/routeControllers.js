import Boom from 'boom';
import { predictMaliciousRequest } from '../services/predict';
import { resetRequests, getGoodRequests, getBadRequests, getAllRequests } from '../services/localStore';
import { insertBlacklistIp } from '../services/dynamodb';

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

export const clearRequests = {
  path: '/api/requests',
  method: 'DELETE',
  handler: (req, res) => {
    res(resetRequests());
  }
};

export const blacklistIp = {
  path: '/api/blacklist',
  method: 'POST',
  handler: (req, res) => {
    const ip = req.payload.ip;
    if (ip) {
      res(insertBlacklistIp(ip));
    } else {
      res(Boom.badRequest('IP to blacklist required'));
    }
  }
};
