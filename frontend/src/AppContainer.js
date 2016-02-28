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
    location: undefined,
    myMeetings: myMeetingsInit(),
    newMeeting: newMeetingInit()
  };
};

export const AppContainer = ({dispatcher, appData}) => {
  let page = <Home dispatcher={dispatcher} appData={appData} />;
  if (appData.location) {
    switch(appData.location.pathname) {
      case '/new_meeting':
        page = <NewMeeting dispatcher={dispatcher.forwardTo('newMeeting')}
                           newMeeting={appData.newMeeting} />;
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

const Home = ({appData, dispatcher}) => {
  return (
    <span>
      <Row>
        <HomeControls home={appData} dispatcher={dispatcher} />
      </Row>
      <Row>
        <MyMeetings meetings={appData.myMeetings}
                    dispatcher={dispatcher.forwardTo('my_meetings')} />
      </Row>
    </span>
  );
}

const HomeControls = ({home, dispatcher}) => {
  const newMeeting = dispatcher.send('navigate_new_meeting');

  return (
    <ButtonGroup vertical block>
      <NewMeetingButton newMeeting={newMeeting}/>
    </ButtonGroup>
  );
};

const NewMeetingButton = ({newMeeting}) => {
  return (
    <Button onClick={newMeeting}>
      New Meeting
    </Button>
  );
}
