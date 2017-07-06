import { ACTIVITY_LOADED } from '../actions/activityCreator';

const initialState = null;

export default function reduce(state = initialState, action) {
    switch (action.type) {
      case ACTIVITY_LOADED:
          return action.payload;
      default:
          return state;
    }
}
