import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './rootReducer';

const configureStore = (initialState) => {
    const middleware = applyMiddleware(
        thunk,
        routerMiddleware(browserHistory)
    );

    const createStoreWithMiddleware = compose(middleware);
    const store = createStoreWithMiddleware(createStore)(
        rootReducer,
        initialState
    );

    /* istanbul ignore if */
    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const nextRootReducer = require('./rootReducer').default;

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;