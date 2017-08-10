import low from 'lowdb';
import uuidv4 from 'uuid/v4';
import fs from 'fs';

const dbFile = 'stored-requests.json';
const db = low(dbFile);

export function initDb() {
  db.defaults({ requests: { bad: [], good: [] }})
    .write();
}

export function storePrediction(requestLog, confidence) {
  const reqArr = confidence < .5 ? 'requests.good' : 'requests.bad';
  let query = db.get(reqArr);

  if (!query.value()) {
    initDb();
  }

  query.push({
      id: uuidv4(),
      log: requestLog,
      confidence: confidence
    })
    .write();
}

export function getAllRequests() {
    const empty = {
        bad: [],
        good: []
    };
    return db.get('requests').value() || empty;
}

export function getGoodRequests() {
  return db.get('requests.good').value() || [];
}

export function getBadRequests() {
  return db.get('requests.bad').value() || [];
}

export function getRequestById(logId) {
  const goodReq = db.get('requests.good')
    .find({ id: logId })
    .value();
  const badReq = db.get('requests.bad')
    .find({ id: logId })
    .value();
  return goodReq || badReq || [];
}

export function deleteRequestById(logId) {
  db.get('requests.good')
    .remove({ id: logId })
    .write();
  db.get('requests.bad')
    .remove({ id: logId })
    .write();
}

export function resetRequests() {
  return db.set('requests.good', [])
    .set('requests.bad', [])
    .write();
}

export function searchRequests(reqType, fromDate, toDate) {
  const validReqType = reqType === 'good' || reqType === 'bad';
  if (validReqType && fromDate && toDate) {
    return db.get(`requests.${reqType}`)
      .filter(r => {
        return r.log.timestamp >= fromDate
          && r.log.timestamp <= toDate;
      }).value() || [];
  } else {
    return getGoodRequests();
  }
}
