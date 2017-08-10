import { postBlacklistIp, postSafeRequestEntry } from '../../services/quarantineService';

export const blacklistIp = (ip) => {
    return (dispatch) => {
        return postBlacklistIp({ip: ip}, (err, data) => {
            if (!err) {
                // Notify user somehow... toastr msg?
                alert(`${ip} Blacklisted`);
            } else {
                throw(err);
            }
        })
    }
}

export const safeRequest = (logId) => {
    return (dispatch) => {
        return postSafeRequestEntry({logId: logId, isMalicious: false}, (err, data) => {
            if (!err) {
                alert('Request sample was added to model retraining list');
            } else {
                throw(err);
            }
        })
    }
}
