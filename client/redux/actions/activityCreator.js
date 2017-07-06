import { getActivity, deleteActivity } from '../../services/activityService';
import { showLoader, hideLoader } from './loadingCreator';

export const ACTIVITY_LOADED = 'ACTIVITY_LOADED';

export const activityLoaded = (activity) => {
    return {
        type: ACTIVITY_LOADED,
        payload: activity
    }
};

export const clearActivity = () => {
    return (dispatch) => {
        return deleteActivity({}, (err, data) => {
            if (!err) {
                dispatch(loadActivity());
            } else {
                throw(err);
            }
        });
    }
}

export const loadActivity = () => {
    return (dispatch) => {
        // dispatch(showLoader());
        return getActivity((err, data) => {
            if (!err) {
                dispatch(activityLoaded(data));
            } else {
                throw(err);
            }
            // dispatch(hideLoader());
        });
    }
}
