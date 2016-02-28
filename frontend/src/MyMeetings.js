/* @flow */

import React from 'react';
import _ from 'lodash';
import {
    Input
  , ListGroup, ListGroupItem
  , Glyphicon
} from 'react-bootstrap';

export const myMeetingsInit = () => {
  return [
    {id: 1, name: 'Meeting 1', person: 'andrew'}
  , {id: 2, name: 'Meeting 2', person: 'saem'}
  , {id: 3, name: 'Meeting 3', person: 'michael'}
  ];
}

const createAction = (name, optionalArgs) => {
  const args = optionalArgs || {};

  return _.merge({ actionType: name }, args);
}

export const MyMeetings = ({meetings, dispatcher}) => {
  const meetingsWithActions = _.map(
    meetings,
    m => {
      return {
        data:    m,
        actions: {
          meetingClicked: dispatcher.send('meeting_clicked', {meeting:m})
        }
      };
    }
  );

  return (
    <span>
      <MeetingFilter dispatcher={dispatcher} />
      <MeetingList meetings={meetingsWithActions} />
    </span>
  );
};

const MeetingFilter = ({dispatcher}) => {
  const filterGlyphicon = <Glyphicon glyph="search" />;

  const rawFilterTextAction = (raw) => {
    dispatcher(createAction('raw_filter', {raw: raw.target.value}))();
  };

  return (
    <Input type="text"
           placeholder="Filter meetings by user ..."
           addonBefore={filterGlyphicon}
           onChange={rawFilterTextAction} />
  );
};

const MeetingList = (props) => {
  const meetings = _.map(
    props.meetings,
    m => (<MeetingListItem key={m.data.id} meeting={m} />)
  );

  return (
    <ListGroup>
      {meetings}
    </ListGroup>
  );
};

const MeetingListItem = ({meeting}) => {
  return (
    <ListGroupItem onClick={meeting.actions.meetingClicked}>
      {meeting.data.name}
    </ListGroupItem>
  );
};
