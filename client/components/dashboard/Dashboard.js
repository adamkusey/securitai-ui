import React, { Component } from 'react';
import Activity from '../activity/Activity.js';
import { Col } from 'react-bootstrap';

class Dashboard extends Component {
    render() {
        return (
            <Col xs={12}>
                <h2>Dashboard</h2>
                <Activity/>
            </Col>
        );
    }
}

export default Dashboard;
