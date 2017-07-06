import React, { Component } from 'react';
import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
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

    handleClear = () => {
        this.props.clearActivity();
        renderActivity(this.props.activity);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activity !== nextProps.activity) {
            clearTimeout(this.timeout);
            renderActivity(nextProps.activity);
            this.startPoll();
        }
    }

    startPoll() {
        const POLLING_SECONDS = 10 * 1000;
        this.timeout = setTimeout(() => this.props.loadActivity(), POLLING_SECONDS);
    }

    render() {
        const { activity } = this.props;

        if (!activity || !activity.length) {
            return (
                <Col xs={12}>
                    <h4>There are no suspicious requests to show.</h4>
                </Col>
            );
        }

        return (
          <Grid>
              <Row>
                  <Col xs={6} xsOffset={6}>
                      <ButtonToolbar>
                          <Button bsStyle="primary" className="pull-right" onClick={this.handleClear}>Clear</Button>
                      </ButtonToolbar>
                  </Col>
              </Row>
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
                              {renderActivity(activity)}
                          </tbody>
                      </table>
                  </Col>
              </Row>
          </Grid>
        );
    }
}

export default Activity;
