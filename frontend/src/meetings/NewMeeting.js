/* @flow */

import React from 'react';
import _ from 'lodash';
import { Input } from 'react-bootstrap';

export const newMeetingInit = () => {
  return {
    reportedMetrics: [
      {name: 'work',       value: 'same'},
      {name: 'company',    value: 'same'},
      {name: 'team',       value: 'same'},
      {name: 'individual', value: 'same'},
      {name: 'manager',    value: 'same'}
    ],
    validMetricValues: ['better', 'same', 'worse'],
    notes: {
      format: 'text',
      value: ''
    }
  };
};

export const NewMeeting = ({newMeeting}) => {
  return (
    <span>
      <h1>New Meeting</h1>
      <form>
        <Metrics metrics={newMeeting.reportedMetrics}
                 metricValues={newMeeting.validMetricValues}/>
      </form>
    </span>
  );
}

const Metrics = ({metrics, metricValues}) => {
  const metricsToRender = _.map(metrics,
    (m, i) => <Metric key={i}
                      metric={m}
                      metricValues={metricValues} />
  );
  return (
    <span>{metricsToRender}</span>
  );
};

const Metric = ({metric, metricValues}) => {
  const onMetricChanged = event => {
    metric.set({value: event.target.value});
  };

  return (
    <MetricView metric={metric}
                onMetricChanged={onMetricChanged}
                metricValues={metricValues} />
  );
};

const MetricView = ({metric, metricValues, onMetricChanged}) => {
  const options = _.map(metricValues,
    (v, i) => (<option key={i} value={v}>{v}</option>));
  return (
    <Input type="select"
           label={metric.name}
           value={metric.value}
           onChange={onMetricChanged}>
        {options}
    </Input>
  );
};
