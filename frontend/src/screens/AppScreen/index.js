/* @flow */

import React, { PropTypes } from 'react';
import { Grid, Input, Row, Col, Button } from 'react-bootstrap';

export default class AppScreen extends React.Component {
  componentWillMount() {

    // Where we fetch and retrieve the data for metrics from
    // Known only after data load
    const metricPersistence = [
      {
        "links": {
          "self": "http://hairpiece.com/api/users/3/my-meetings/9/metrics/work"
        },
        "data": {
          "type": "metric",
          "id": "work",
          "attributes": {
            "created": "2015-11-30T11:41:29Z",
            "updated": "2015-11-30T11:41:29Z",
            "userTrace": "session-id.user-id.service-id1"
          },
          "relationships": {
            "metrics": {
              "links": {
                "related": "http://hairpiece.com/api/users/3/my-meetings/9/metrics"
              },
              "data": [
                { "type": "metrics", "id": "9" } //assuming metrics share the meetings id to start
              ]
            }
          }
        }
      }
      // more metric persistence stuff should go here, but it's lots of text
    ];

    // Something a metric should intrinsically know (In the UI, or Domain?)
    // This is known really early and should live outside of mutable state
    const validMetricsOptions = [
      { name: "better", display: "Better" },
      { name: "same"  , display: "Same"},
      { name: "worse" , display: "Worse"}
    ];

    // Something that metrics should know (In the UI, or Domain?)
    // This is known really early and should live outside of mutable state
    const listOfMetricsToCollect = [
      { name: "work",     display: "Work" },
      { name: "company",  display: "Company" },
      { name: "team",     display: "Team" },
      { name: "yourself", display: "Yourself" },
      { name: "manager",  display: "Manager" }
    ];

    // Something that a specific meeting knows, and the UI informs of updates?
    // Known only after data load
    const metricsCurrentValues = {
      "work": "same",
      "company": "same",
      "team": "same",
      "yourself": "same",
      "manager": "same"
    };

    // It should probably somehow all/some of it should combine and show up in
    // here, that way a metrics can say this is how I display, this is what you
    // can change me to, etc...
    this.props.state.set({
      meeting: {
        metrics: {
          metricOptions: validMetricsOptions,
          data: [
            { name: "work", display: "Work" },
            { name: "company", display: "Company" },
            { name: "team", display: "Team" },
            { name: "yourself", display: "Yourself", value: "worse" },
            { name: "manager", display: "Manager "}
          ]
        }
      }
    });
  }

  render () {
    const metrics = this.props.state.meeting.metrics;
    const metricComponents = metrics.data
      .map(m => (
          <Metric key={m.name} metric={m} options={metrics.metricOptions} />
        )
      );

    return (
      <Grid>
        <Row className="show-grid">
          <Col md={8} mdOffset={2} >
            <form>
              {metricComponents}
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
AppScreen.propTypes = {
  state : PropTypes.shape({
    settings: PropTypes.object.isRequired
  }).isRequired
};

class Metric extends React.Component {
  render() {
    const metric = this.props.metric;
    const options = this.props.options
      .map(o => <option key={o.name} value={o.name}>{o.display}</option>);

    const changeHandler = (event) => {
      console.log(event.target.value);

      // we know the user has changed the value, and really that's all this
      // element really cares to publish, now how do we inform interested
      // parties that a higher level concept (new_metric) has occurred:
      //
      // * callback -- contract for input parameters, and return type
      // * freezer state change -- already have to agree to understand data
      // * freezer trigger event -- might need to do this regardless
      // * Rx Observable -- have to tie in subscription creation/disposals
      // * React state API -- currently avoiding the react state API complete
    };

    return (
      <Input type="select"
            label={metric.name}
            onChange={changeHandler}
            defaultValue={metric.value || "same"}>
        {options}
      </Input>
    );
  }
}
Metric.propTypes = {
  metric: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    metricOptions: PropTypes.object.isRequired
  })
};
