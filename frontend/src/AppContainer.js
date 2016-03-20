/* @flow */

import React from 'react';
import _ from 'lodash';
import {
  Grid, Row, Col
  , ButtonGroup, Button
} from 'react-bootstrap';
import { MyMeetings, myMeetingsInit } from './MyMeetings';
import { NewMeeting, newMeetingInit } from './meetings/NewMeeting';

export const init = () => {
  return {
    ready : false,
    location: undefined,
    myMeetings: myMeetingsInit(),
    newMeeting: newMeetingInit()
  };
};

export const AppContainer = ({appData}) => {
  let page = <Home appData={appData} />;
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

const Home = ({appData}) => {
  return (
    <span>
      <Row>
        <HomeControls home={appData} />
      </Row>
      <Row>
        <MyMeetings meetings={appData.myMeetings} />
      </Row>
    </span>
  );
}

const HomeControls = ({home}) => {
  const newMeeting = () => {
    home.getListener().trigger('navigate', { pathname: '/new_meeting' });
  };

  return (
    <ButtonGroup vertical block>
      <NewMeetingButton onNewMeeting={newMeeting}/>
    </ButtonGroup>
  );
};

const NewMeetingButton = ({onNewMeeting}) => {
  return <NewMeetingButtonView onNewMeeting={onNewMeeting} />
};

const NewMeetingButtonView = ({onNewMeeting}) => {
  return (
    <Button onClick={onNewMeeting}>
      New Meeting
    </Button>
  );
};
