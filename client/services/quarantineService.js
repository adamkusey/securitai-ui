import { post } from './requestService';

export function postBlacklistIp(data, callback) {
    post('/api/blacklist', data, callback);
}
