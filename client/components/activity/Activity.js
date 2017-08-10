import React, { Component } from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import JSONTree from 'react-json-tree'
import moment from 'moment'
require('./activity.scss');

function renderActivity(activity, blacklistIp, safeRequest) {
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
                <button type="button" title="Block IP" onClick={() => blacklistIp(item.log.source.remoteAddress)}><img src='/static/images/hacker-block.png'/></button>
                <button type="button" title="Email Details"><img src='/static/images/email.ico' className="email" /></button>
                <Button bsSize="xsmall" bsClass="no-threat-btn" onClick={() => safeRequest(item.id)}>
                    <Glyphicon glyph="check" />
                </Button>
            </td>
        </tr>
    ));
}

class Activity extends Component {
    constructor(props) {
        super(props);
        props.loadActivity();
        this.startPoll();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    startPoll() {
        const POLLING_SECONDS = 1 * 1000;
        this.timeout = setTimeout(() => {
            this.props.loadActivity();
            this.startPoll();
        }, POLLING_SECONDS);
    }

    render() {
        const { activity, blacklistIp, safeRequest } = this.props;

        if (!activity) return null;

        if (!activity.length) {
            return (
                <Col xs={12} className="no-results">
                    <h4>There are no suspicious requests to show.</h4>
                </Col>
            );
        }

        return (
              <Row>
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
                              {renderActivity(activity, blacklistIp, safeRequest)}
                          </tbody>
                      </table>
                  </Col>
              </Row>
        );
    }
}

export default Activity;
