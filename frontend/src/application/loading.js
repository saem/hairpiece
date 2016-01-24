/** @flow */

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export const Component = (props) => (
  <Grid>
    <Row className="show-grid">
      <Col md={8} mdOffset={2} >
        <h1>Loading...</h1>
        <h2>Please wait.</h2>
      </Col>
    </Row>
  </Grid>
);
