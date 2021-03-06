/** @flow */

import React from 'react';
import { Grid, Input, Row, Col } from 'react-bootstrap';
import { Sidebar } from './Sidebar';

export const Component = (state: Object): Function =>
  props => (
      <Grid>
        <Row className="show-grid">
          <Col md={4} >
            <Sidebar />
          </Col>
          <Col md={8} >
            { props.children }
          </Col>
        </Row>
      </Grid>
    );

export const initState = (initialState: any) =>
  initialState || defaultState;

const Actions = {
  start:  'application_start'
};

const defaultState = {
  status: 'uninitialized',
  settings: {
    app: {
      api:  "https://www.hairpiece.com/api"
    }
  }
};

// GET https://www.hairpiece.com/api
// Response
/*
{
  appName: "Hair Piece",
  refs: {
    "self": ...
    "user": { username ... }
    "settings": { notifications: false }
    "meetings": { existingMeetings, newMeeting, ... }
    ""
  },
  "related": {

  }
}
*/
