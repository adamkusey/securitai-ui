import React, { Component } from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import JSONTree from 'react-json-tree'
import moment from 'moment'
require('./activity.scss');

function getClientIp(req) {
    const realIpHeader = req.headers ? req.headers['x-real-ip'] : null;
    const forwardedForHeader = req.headers ? req.headers['x-forwarded-for'] : null;
    if (realIpHeader) {
        return realIpHeader;
    } else if (forwardedForHeader) {
        const ips = forwardedForHeader.split(',');
        return ips[ips.length - 1];
    } else {
        return null;
    }
}

function getRequest(item, className) {
    return (
        <div className={`activity ${className || ''}`}>
            <JSONTree
                data={item.log}
                shouldExpandNode={() => false}
            />
        </div>
    );
}

function renderActivity(activity, blacklistIp, publishNotification, safeRequest) {
    return activity.map((item, index) => (
        <li className="activity-li" key={item.id || index}>
            <div className="activity">{moment(item.log.timestamp).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div className="activity">{getClientIp(item.log) || '-'}</div>
            {getRequest(item)}
            <div className="activity">{(item.confidence * 100).toFixed(2)}%</div>
            <div className="activity">
                <button type="button" title="Block IP" onClick={() => blacklistIp(item.log.source.remoteAddress)}><img src='/static/images/hacker-block-border.png'/></button>
                <button type="button" title="Email Details" onClick={() => publishNotification(item)}><img src='/static/images/email.ico' className="email" /></button>
                <Button bsSize="xsmall" bsClass="no-threat-btn" onClick={() => safeRequest(item.id)}>
                    <Glyphicon glyph="check" />
                </Button>
            </div>
            {getRequest(item, 'mobile')}
        </li>
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
        const { activity, blacklistIp, publishNotification, safeRequest, requestId } = this.props;

        if (!activity) return null;

        const filteredActivity = requestId ? activity.filter(a => a.id === requestId) : activity;

        if (!filteredActivity.length) {
            return (
                <Col xs={12} className="no-results">
                    <h4>There are no suspicious requests to show with the selected filters.</h4>
                </Col>
            );
        }

        return (
              <Row>
                  <Col xs={12}>
                      <ol className="activity-table">
                          <li className="activity-li activity-header">
                              <div className="activity">Timestamp</div>
                              <div className="activity">IP</div>
                              <div className="activity">Request</div>
                              <div className="activity">Confidence</div>
                              <div className="activity">Actions</div>
                          </li>
                          {renderActivity(filteredActivity, blacklistIp, publishNotification, safeRequest)}
                      </ol>
                  </Col>
              </Row>
        );
    }
}

export default Activity;
