import { postBlacklistIp } from '../../services/quarantineService';

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
