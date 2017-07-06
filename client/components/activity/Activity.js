import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import JSONTree from 'react-json-tree'
import moment from 'moment'
require('./activity.scss');

function renderActivity(activity) {
    return activity.map((item, index) => (
        <tr key={item.id || index}>
            <td>{moment(item.log.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td>{item.log.source.remoteAddress}</td>
            <td>
                <JSONTree
                    data={item.log}
                    shouldExpandNode={() => false}
                />
            </td>
            <td>{(item.confidence * 100).toFixed(2)}%</td>
            <td>
                <button type="button" title="Block IP"><img src='/static/images/hacker-block.png'/></button>
                <button type="button" title="Email Details"><img src='/static/images/email.ico' className="email" /></button>
            </td>
        </tr>
    ));
}

class Activity extends Component {
    constructor(props) {
        super(props);
        props.loadActivity();
    }

    render() {
        const { activity } = this.props;

        if (!activity || !activity.length) {
            return null;
        }

        return (
            <Col xs={12}>
                <table className="activity-table">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>IP</th>
                            <th>Request</th>
                            <th>Confidence</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderActivity(activity)}
                    </tbody>
                </table>
            </Col>
        );
    }
}

export default Activity;
