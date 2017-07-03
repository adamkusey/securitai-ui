import { TRANSLATIONS_RECEIVED } from '../actions/translationsCreator';

const initialState = {};

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case TRANSLATIONS_RECEIVED:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};
