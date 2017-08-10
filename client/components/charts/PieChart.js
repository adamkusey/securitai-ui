import React, { Component } from 'react';
import Highcharts from 'react-highcharts';

function getSeries(activity) {
    return [{
        name: 'count',
        colorByPoint: true,
        data: [{
            name: 'Regular Traffic',
            y: activity.good.length
        }, {
            name: 'Malicious Requests',
            y: activity.bad.length
        }]
    }];
}

class PieChart extends Component {
    render() {
        const {activity} = this.props;
        const config = {
            chart: {
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0,
                type: 'pie'
            },
            title: {
                text: ''
            },
            series: getSeries(activity)
        };
        return <Highcharts config={config}/>;
    }
}

export default PieChart;
