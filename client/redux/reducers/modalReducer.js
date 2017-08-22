import { RECEIVED_MODAL_SHOW, RECEIVED_MODAL_CLOSE} from '../actions/modalCreator';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
    text: null,
    modalVisible: false
};

export default function modal(state = initialState, action) {
    switch (action.type) {
        case RECEIVED_MODAL_SHOW:
            return Object.assign({}, state, {
                modalVisible: true,
                text: action.payload
            });
        case RECEIVED_MODAL_CLOSE:
            return Object.assign({}, state, initialState);
        case LOCATION_CHANGE:
            return initialState;
        default:
            return state;
    }
}
