import React, { Component } from 'react';
import _ from 'lodash';
import ReactHighstock from 'react-highcharts/ReactHighstock';

function mapToPerMinute(requests) {
    return requests.map(r => {
        r.log.timestamp = Math.floor(r.log.timestamp / 1000 / 60);
        return r;
    });
}

function getData(requests) {
    let data = [];

    let coll = mapToPerMinute(requests);
    const grouped = _.groupBy(coll, 'log.timestamp');
    _.forEach(grouped, (value, key) => {
        data.push([parseInt(key), value.length]);
    });

    return data;
}

function getSeries(name, requests) {
    return {
        name,
        data: getData(requests)
    };
}

class PieChart extends Component {
    render() {
        const {activity} = this.props;
        const config = {
            rangeSelector: {
                selected: 1
            },
            title: {
                text: ''
            },
            series: [
                getSeries('Regular', _.cloneDeep(activity.good)),
                getSeries('Malicious', _.cloneDeep(activity.bad))
            ]
        };
        return <ReactHighstock config={config}/>;
    }
}

export default PieChart;
