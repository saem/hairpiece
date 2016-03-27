import React from 'react';
import _ from 'lodash';
import {
  Row
  , ButtonGroup, Button
} from 'react-bootstrap';
import { MyMeetings, myMeetingsInit } from './MyMeetings';

export const homeInit = () => {
  return { myMeetings: myMeetingsInit() };
};

export const Home = ({appData}) => {
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
    console.log('new meeting');
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
