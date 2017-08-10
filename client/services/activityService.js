import { get, del } from './requestService';

export function getActivity(callback) {
    get('/api/requests', callback);
}

export function deleteActivity(data, callback) {
    del('/api/requests', data, callback);
}
