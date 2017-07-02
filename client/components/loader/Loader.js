import React, { Component } from 'react';
import ReactLoader from 'react-loader';

class Loader extends Component {
    render() {
        const { loading } = this.props;

        if (loading) {
            return (
                <div className="app-loader screen-cover">
                    <ReactLoader scale={0.7} color="#ccc"/>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Loader;
