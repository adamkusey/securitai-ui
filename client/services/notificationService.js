import { post } from './requestService'

export function postNotification(data, callback) {
    post('/api/notification', data, callback);
}
