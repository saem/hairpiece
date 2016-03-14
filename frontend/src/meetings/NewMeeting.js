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

const newMeetingUpdate = (action, state) => {
  return state;
}

const createAction = (name, optionalArgs) => {
  const args = optionalArgs || {};

  return _.merge({ actionType: name }, args);
}

export const NewMeeting = ({dispatcher, newMeeting}) => {
  const metricsWithActions = _.map(
    newMeeting.reportedMetrics,
    metric => {
      return {
        data: _.merge(metric, { values: newMeeting.validMetricValues}),
        action: {
          metricChanged: dispatcher.send('change_metric', {metric})
        }
      };
    }
  )

  return (
    <span>
      <h1>New Meeting</h1>
      <form>
        <Metrics metrics={metricsWithActions}/>
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
  const options = _.map(metric.data.values,
    (v, i) => (<option key={i} value={v}>{v}</option>));
  return (
    <Input type="select"
           label={metric.data.name}
           value={metric.data.value}
           onChange={metric.action.metricChanged}>
        {options}
    </Input>
  );
}
