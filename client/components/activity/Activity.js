import React, { Component } from 'react';
import { Col, Table } from 'react-bootstrap';
import { get } from '../../services/requestService';
import { loadMaliciousActivity } from '../../redux/actions/activityCreator';

class Activity extends Component {

    render() {
        return (
            <Col xs={12}>
                <div>{this.props.activity}</div>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Request Log</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>logs here</td></tr>
                  </tbody>
                </Table>
            </Col>
        );
    }
}

export default Activity;
