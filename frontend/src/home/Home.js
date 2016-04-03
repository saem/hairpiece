import React from 'react';
import _ from 'lodash';
import {
  Row
  , ButtonGroup, Button
  , DropdownButton, MenuItem
} from 'react-bootstrap';
import { MyMeetings, myMeetingsInit } from './MyMeetings';

export const homeInit = () => {
  return {
    myMeetings: myMeetingsInit()
  };
};

export const Home = ({appData, subordinates, effects}) => {
  return (
    <span>
      <Row>
        <HomeControls subordinates={subordinates} effects={effects} />
      </Row>
      <Row>
        <MyMeetings meetings={appData.myMeetings} />
      </Row>
    </span>
  );
};

const HomeControls = ({subordinates, effects}) => {
  return (
    <ButtonGroup vertical block>
      <NewMeetingButton subordinates={subordinates} effects={effects}/>
    </ButtonGroup>
  );
};

const NewMeetingButton = ({subordinates, effects}) => {
  const onNewMeeting = (s) => effects.navigate({
    pathname: '/new_meeting/' + s.id
  });

  const subordinateItems = _.map(subordinates, (s, i) => {
    const onSelect = () => onNewMeeting(s);

    return <MenuItem key={i} onSelect={onSelect}>{s.name}</MenuItem>
  });

  return (
    <DropdownButton title='New Meeting' id="new_meeting_button">
      {subordinateItems}
    </DropdownButton>
  );
};
