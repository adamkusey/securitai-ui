import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './redux/configureStore';
import getRoutes from './routes/routes';
import App from './components/App';
import translations from './translations/translations';

import styles from './sass/_globals.scss';

const store = configureStore({
    translations
});

const history = syncHistoryWithStore(browserHistory, store);

render(
    <App
        store={store}
        history={history}
        routes={getRoutes()}
    />,
    document.getElementById('app')
);
