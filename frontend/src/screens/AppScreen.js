/* @flow */

import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

export default class AppScreen extends React.Component {
  render () {
    const state = this.props.state;

    return (
      <Grid>
        <Row className="show-grid">
          <Col md={4}>
            <Overview state={state.overview} settings={state.settings} />
          </Col>
          <Col md={8}>
            <Detail state={state.detail} settings={state.settings} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
AppScreen.propTypes = {
  state : React.PropTypes.shape({
    overview: React.PropTypes.object.isRequired,
    detail: React.PropTypes.object,
    settings: React.PropTypes.object.isRequired
  }).isRequired
};

class Detail extends React.Component {
  render () {
    return (
      <h1>Select a meeting, or something, whatevs</h1>
    );
  }
}
Detail.propTypes = {
  state : React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
};

class Overview extends React.Component {
  render () {
    const people: {displayName: String} = this.props.state.people.map((p) => (
      <h1 key={p.id}>{p.attributes.fullName}</h1>
    ));

    return (
      <span className="overview">
        <span className="people">
          {people}
        </span>
      </span>
    );
  }
}
Overview.propTypes = {
  state : React.PropTypes.shape({
    people: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        attributes: React.PropTypes.shape({
          fullName: React.PropTypes.string.isRequired
        }).isRequired
      })
    )
  }).isRequired,
  settings: React.PropTypes.object.isRequired
};
