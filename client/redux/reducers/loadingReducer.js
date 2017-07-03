import { SHOW_LOADER, HIDE_LOADER } from '../actions/loadingCreator';

const initialState = false;

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return true;
        case HIDE_LOADER:
            return false;
        default:
            return state;
    }
};
