import React, { Component } from 'react';
import { Col, Table } from 'react-bootstrap';
import { get } from '../../services/requestService';
import { loadMaliciousActivity } from '../../redux/actions/activityCreator';

class Activity extends Component {
    constructor() {
        super();
        this.badActivityRows = [];
    }

    componentWillReceiveProps(props) {
        if (props.malicious) {
            props.malicious.forEach(item => {
                this.badActivityRows.push(<tr><td>{JSON.stringify(item.log)}</td><td>{(item.confidence * 100).toFixed(2)}%</td></tr>);
            });
        }
    }

    render() {
        return (
            <Col xs={12}>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Suspicious Requests</th>
                            <th>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.badActivityRows}
                    </tbody>
                </Table>
            </Col>
        );
    }
}

export default Activity;
