import { postNotification } from '../../services/notificationService';
import { showModal } from './modalCreator';
import moment from 'moment'

function buildMsg(item) {
    const dt = moment(item.log.timestamp).format('YYYY-MM-DD HH:mm:ss');
    const path = item.log.path;
    return `😱 SecuritAI has detected a suspicious request against the ${path} endpoint.` +
        ` This occurred on ${dt}, please take precautionary action as necessary.` +
        ` You can view the attack and take action here: http://www.securitai.co/?requestId=${item.id}`;
}

export const publishNotification = (item) => {
    return (dispatch) => {
        const msg = buildMsg(item);
        postNotification({ msg }, (err) => {
            if (!err) {
                dispatch(showModal('Notification Sent.'));
            } else {
                dispatch(showModal('An error occurred. Please try again later.'));
            }
        })
    }
}
