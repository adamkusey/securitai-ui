import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PieChart from './PieChart';
import TimeChart from './TimeChart';
// import theme from './theme';
// import Highcharts from 'highcharts';

// Highcharts.setOptions(theme);

class Charts extends Component {
    render() {
        const { activity } = this.props;

        if (!activity) return null;

        return (
            <Row>
                <Col md={12} lg={7}>
                    <TimeChart activity={activity}/>
                </Col>
                <Col md={12} lg={5}>
                    <PieChart activity={activity}/>
                </Col>
            </Row>
        );
    }
}

export default Charts;
