import { post } from './requestService';

export function postBlacklistIp(data, callback) {
    post('/api/blacklist', data, callback);
}

export function postSafeRequestEntry(data, callback) {
    post('/api/retrainSample', data, callback);
}
