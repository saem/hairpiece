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
    const meetings = this.props.state.pastMeetings.data.map((m) => (
        <h1 key={m.id}>{m.attributes.themes}</h1>
      )
    );

    return (
      <span className="overview">
        <span>
          <Button bsStyle="primary">Facilitate Meeting</Button>
        </span>
        <span className="pastMeetings">
          {meetings}
        </span>
      </span>
    );
  }
}
Overview.propTypes = {
  state : React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired
};
