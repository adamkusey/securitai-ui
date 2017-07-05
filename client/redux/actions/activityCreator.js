import { get } from '../../services/requestService';

export const LOAD_MALICIOUS_ACTIVITY_SUCCESS = 'LOAD_MALICIOUS_ACTIVITY_SUCCESS';
export const LOAD_MALICIOUS_ACTIVITY = 'LOAD_MALICIOUS_ACTIVITY';

export const loadMaliciousActivitySuccess = (activity) => {
    return {
        type: 'LOAD_MALICIOUS_ACTIVITY_SUCCESS',
        payload: activity
    }
};

export const loadMaliciousActivity = () => {
    return (dispatch) => {
        return get('http://localhost:8081/api/bad', (err, data) => {
            if (!err) {
                dispatch(loadMaliciousActivitySuccess(data));
            } else {
                throw(err);
            }
        })
    }
}

export const actions = {
  loadMaliciousActivitySuccess,
  loadMaliciousActivity
}
