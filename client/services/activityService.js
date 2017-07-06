import { get } from './requestService';

export function getActivity(callback) {
    get('/api/requests/bad', callback);
}