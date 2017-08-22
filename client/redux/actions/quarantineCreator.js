import { postBlacklistIp, postSafeRequestEntry } from '../../services/quarantineService';
import { showModal } from './modalCreator';

export const blacklistIp = (ip) => {
    return (dispatch) => {
        return postBlacklistIp({ip: ip}, (err) => {
            if (!err) {
                // Notify user somehow... toastr msg?
                dispatch(showModal(`The ip: "${ip}" has been added to the black list.`));
            } else {
                dispatch(showModal('An error occurred. Please try again later.'));
            }
        })
    }
}

export const safeRequest = (logId) => {
    return (dispatch) => {
        return postSafeRequestEntry({logId: logId, isMalicious: false}, (err) => {
            if (!err) {
                dispatch(showModal('Request sample was added to model retraining list.'));
            } else {
                dispatch(showModal('An error occurred. Please try again later.'));
            }
        })
    }
}
