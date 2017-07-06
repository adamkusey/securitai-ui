import React, { Component } from 'react';
import Activity from '../../containers/activity/ActivityContainer.js';
import { Grid, Row, Col } from 'react-bootstrap';

class Dashboard extends Component {
    render() {
        return (
          <Grid>
              <Row>
                  <Col xs={12}>
                      <h2>Dashboard</h2>
                      <Activity/>
                  </Col>
              </Row>
          </Grid>
        );
    }
}

export default Dashboard;
