import { postNotification } from '../../services/notificationService';

export const publishNotification = (msg) => {
    return (dispatch) => {
        return postNotification({msg: msg}, (err, data) => {
            if (!err) {
                alert('Notification Sent!');
            } else {
                throw(err);
            }
        })
    }
}
