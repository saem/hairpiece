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
  const metrics = _.map(
    newMeeting.reportedMetrics,
    m => _.merge({}, m, { values: newMeeting.validMetricValues })
  );

  return (
    <span>
      <h1>New Meeting</h1>
      <form>
        <Metrics metrics={metrics}/>
      </form>
    </span>
  );
}

const Metrics = ({metrics}) => {
  const metricsToRender = _.map(metrics,
    (m, i) => <Metric key={i} metric={m} />
  );
  return (
    <span>{metricsToRender}</span>
  );
};

const Metric = ({metric}) => {
  const onMetricChanged = () => console.log('on metric changed');

  const options = _.map(metric.values,
    (v, i) => (<option key={i} value={v}>{v}</option>));
  return (
    <Input type="select"
           label={metric.name}
           value={metric.value}
           onChange={onMetricChanged}>
        {options}
    </Input>
  );
}
