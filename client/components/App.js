import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

class App extends Component {
    render() {
        const { store, history, routes } = this.props;

        return (
            <Provider store={store}>
                <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
                    {routes}
                </Router>
            </Provider>
        );
    }
}

export default App;
