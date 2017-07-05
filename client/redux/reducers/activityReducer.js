import { LOAD_MALICIOUS_ACTIVITY_SUCCESS } from '../actions/activityCreator';

const initialState = {};

export default function reduce(state = initialState, action) {
    console.log(action);
    switch (action.type) {
      case LOAD_MALICIOUS_ACTIVITY_SUCCESS:
          return Object.assign({}, state, action.payload);
      default:
          return state;
    }
}
