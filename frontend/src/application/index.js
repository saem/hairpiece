import React from 'react';
import { freezer } from './domain';
import { Grid, Row, Col } from 'react-bootstrap';

export default class AppContainer extends React.Component {
  constructor () {
    super();
  }

  render () {
    const state = freezer.get();

    return (
      <Application state={state} />
    );
  }

  componentDidMount () {
    const me = this;
    freezer.on('update', () => me.forceUpdate() );
  }
}

class Application extends React.Component {
  static PropTypes = {
    state : React.PropTypes.object.isRequired
  }
  
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

class Overview extends React.Component {
  static PropTypes = {
    state : React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired
  }
  
  render () {
    console.log(this.props.state.pastMeetings.data);
    const meetings = this.props.state.pastMeetings.data.map(m => ( 
        <h1>{m.themes}</h1>
      )
    );
    
    return (
      <span className="pastMeetings">
        {meetings}
      </span>
    );
  }
}

class Detail extends React.Component {
  static PropTypes = {
    state : React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired
  }
  
  render () {
    return (
      <h1>Select a meeting, or something, whatevs</h1>
    );
  }
}
