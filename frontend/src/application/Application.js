import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Overview } from './Overview';
import { Detail } from './Detail';

export default class Application extends React.Component {
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
Application.propTypes = {
  state : React.PropTypes.shape({
    overview: React.PropTypes.object.isRequired,
    detail: React.PropTypes.object,
    settings: React.PropTypes.object.isRequired
  }).isRequired
};
