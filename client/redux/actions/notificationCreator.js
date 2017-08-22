import { postNotification } from '../../services/notificationService';
import { showModal } from './modalCreator';

export const publishNotification = (msg) => {
    return (dispatch) => {
        return postNotification({msg: msg}, (err) => {
            if (!err) {
                dispatch(showModal('Notification Sent.'));
            } else {
                dispatch(showModal('An error occurred. Please try again later.'));
            }
        })
    }
}
