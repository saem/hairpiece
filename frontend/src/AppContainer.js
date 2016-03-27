/* @flow */

import React from 'react';
import _ from 'lodash';
import {
  Grid, Row, Col
} from 'react-bootstrap';
import { Home, homeInit } from './home/Home';
import { NewMeeting, newMeetingInit } from './meetings/NewMeeting';

export const init = () => {
  return {
    ready : false,
    location: undefined,
    home: homeInit(),
    newMeeting: newMeetingInit()
  };
};

export const AppContainer = ({appData}) => {
  let page = <Home appData={appData.home} />;
  if(appData.location) {
    switch(appData.location.pathname) {
      case '/new_meeting':
        page = <NewMeeting newMeeting={appData.newMeeting} />;
      break;
    }
  }

  return (
    <Grid>
      <Row className="show-grid">
        <Col md={8} mdOffset={2} >
          {page}
        </Col>
      </Row>
    </Grid>
  );
};
