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

export const Home = ({appData, effects}) => {
  return (
    <span>
      <Row>
        <HomeControls home={appData} effects={effects} />
      </Row>
      <Row>
        <MyMeetings meetings={appData.myMeetings} />
      </Row>
    </span>
  );
}

const HomeControls = ({home, effects}) => {
  return (
    <ButtonGroup vertical block>
      <NewMeetingButton effects={effects}/>
    </ButtonGroup>
  );
};

const NewMeetingButton = ({effects}) => {
  const onNewMeeting = () => effects.navigate({ pathname: '/new_meeting' });

  return <NewMeetingButtonView onNewMeeting={onNewMeeting} />
};

const NewMeetingButtonView = ({onNewMeeting}) => {
  return (
    <Button onClick={onNewMeeting}>
      New Meeting
    </Button>
  );
};
