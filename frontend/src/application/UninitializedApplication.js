import React from 'react';
import { Grid, Row } from 'react-bootstrap';

export default class UninitializedApplication extends React.Component {
  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <h1>Loading...</h1>
        </Row>
      </Grid>
    );
  }
}
