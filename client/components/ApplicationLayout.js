import React, { Component } from 'react';
import Header from '../containers/header/HeaderContainer';
import Loader from '../containers/loader/LoaderContainer';

class ApplicationLayout extends Component {
    render() {
        const { children } = this.props;

        return (
            <div style={{ height: '100%' }}>
                <Header />

                <div className="app-container">
                    {children}
                </div>

                <Loader />
            </div>
        );
    }
}

export default ApplicationLayout;
