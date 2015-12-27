/** @flow */

import React from 'react';
import Freezer from 'freezer-js';
import Kefir from 'kefir';
import { Input } from 'react-bootstrap';

export const Component = (stateManager: Freezer): { View: Function, intents: any} => ({
  View: (props) => (
    <span>
      <h1>New Meeting</h1>
      <Metrics metrics={stateManager.get()}/>
    </span>),
  intents: {}
});

const defaultState = {
  metricOptions: [
      { name: "better", display: "Better" },
      { name: "same"  , display: "Same"},
      { name: "worse" , display: "Worse"}
    ],
  data: [
    { name: "work", display: "Work" },
    { name: "company", display: "Company" },
    { name: "team", display: "Team" },
    { name: "yourself", display: "Yourself", value: "worse" },
    { name: "manager", display: "Manager "}
  ]
};

export const stateManager = (initialState: any) =>
  new Freezer(initialState || defaultState);

  const Metrics = (props) => {
    const metrics = props.metrics;
    const metricComponents = metrics.data
      .map(m => (
          <Metric key={m.name} metric={m} options={metrics.metricOptions} />
        )
      );
    return (<form>{metricComponents}</form>);
  };

const Metric = (props) => {
  const metric = props.metric;
  const options = props.options
    .map(o => <option key={o.name} value={o.name}>{o.display}</option>);

  const changeHandler = (event) => {
    console.log(event.target.value);
  }

  return (
    <Input type="select"
          label={metric.display}
          onChange={changeHandler}
          defaultValue={metric.value || "same"}>
      {options}
    </Input>
  );
};
