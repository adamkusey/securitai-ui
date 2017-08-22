import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import translations from './reducers/translationsReducer';
import loading from './reducers/loadingReducer';
import activity from './reducers/activityReducer';
import modal from './reducers/modalReducer';

export default combineReducers({
    routing: routerReducer,
    activity,
    translations,
    loading,
    modal
});
