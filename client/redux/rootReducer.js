import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import translations from './reducers/translationsReducer';
import loading from './reducers/loadingReducer';

export default combineReducers({
    routing: routerReducer,
    translations,
    loading
});