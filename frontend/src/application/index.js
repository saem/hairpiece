/** @flow */

import React from 'react';
import Freezer from 'freezer-js';
import Kefir from 'kefir';
import { Grid, Input, Row, Col } from 'react-bootstrap';
import { Sidebar } from './Sidebar';

export const Component = (stateManager: Freezer): { View: Function, intents: any} =>
  ({
    View: (props) => (
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

    ),
    intents: {
      [Actions.start]: Kefir.constant({
            action: Actions.start,
            payload: { state: stateManager.get() }
          })
          .filter(intent => !intent.payload.state.initialized)
    }
  });

export const stateManager = (initialState: any) =>
  new Freezer(initialState || defaultState);

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
