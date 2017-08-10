import Boom from 'boom';
import { predictMaliciousRequest } from '../services/predict';
import {
  resetRequests,
  deleteRequestById,
  getGoodRequests,
  getBadRequests,
  getAllRequests,
  getRequestById,
  searchRequests
} from '../services/localStore';
import {
  insertBlacklistIp,
  insertRetrainEntry
} from '../services/dynamodb';

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
    const reqType = req.query.type;
    const validReqType = reqType === 'good' || reqType === 'bad';
    if (validReqType) {
      const fromDate = req.query.fromDate ? new Date(req.query.fromDate) : undefined;
      const toDate = req.query.toDate ? new Date(req.query.toDate) : Date.now();
      if (!fromDate && toDate) {
        res(Boom.badRequest('fromDate param required if providing toDate'));
      }

      if (fromDate && toDate) {
        res(searchRequests(reqType, fromDate, toDate));
      } else {
        reqType === 'good' ? res(getGoodRequests()) : res(getBadRequests());
      }
    } else {
      res(getAllRequests());
    }
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

export const retrainSample = {
  path: '/api/retrainSample',
  method: 'POST',
  handler: (req, res) => {
    const logId = req.payload.logId;
    const isMalicious = !!req.payload.isMalicious;
    if (logId && isMalicious !== null) {
      const storedReq = getRequestById(logId);
      if (storedReq && storedReq.log) {
        deleteRequestById(logId);
        res(insertRetrainEntry(storedReq.log, isMalicious));
      } else {
        res(Boom.notFound('Log entry not found'));
      }
    } else {
      res(Boom.badRequest('Request log id and label is required'));
    }
  }
}
