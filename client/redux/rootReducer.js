import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import translations from './reducers/translationsReducer';
import loading from './reducers/loadingReducer';
import activity from './reducers/activityReducer';

export default combineReducers({
    routing: routerReducer,
    activity,
    translations,
    loading
});
