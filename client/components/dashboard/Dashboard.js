import React, { Component } from 'react';
import Activity from '../../containers/activity/ActivityContainer';
import Charts from '../../containers/charts/ChartsContainer';
import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
require('./dashboard.scss');

class Dashboard extends Component {
    render() {
        return (
            <Grid className="dashboard">
                <Row>
                    <Col xs={6}>
                        <h2>Dashboard</h2>
                    </Col>
                    <Col xs={6} className="actions">
                        <ButtonToolbar>
                            <Button bsStyle="primary" className="pull-right" onClick={this.props.clearActivity}>Clear</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Charts/>
                <Activity/>
            </Grid>
        );
    }
}

export default Dashboard;
