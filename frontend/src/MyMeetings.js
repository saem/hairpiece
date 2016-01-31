/* @flow */

import React from 'react';
import _ from 'lodash';
import {
    Input
  , ListGroup, ListGroupItem
  , Glyphicon
} from 'react-bootstrap';

const createAction = (name, optionalArgs) => {
  const args = optionalArgs || {};

  return _.merge({ actionType: name }, args);
}

export const MyMeetings = ({meetings, dispatchFactory}) => {
  const meetingsWithActions = _.map(
    meetings,
    m => {
      return {
        data:    m,
        actions: {
          meetingClicked: dispatchFactory(
            createAction('meeting_clicked', {meeting:m})
          )
        }
      };
    }
  );

  return (
    <span>
      <MeetingFilter />
      <MeetingList meetings={meetingsWithActions} />
    </span>
  );
};

const MeetingFilter = (props) => {
  const filterGlyphicon = <Glyphicon glyph="search" />;

  return (
    <Input type="text"
           placeholder="Filter meetings by user ..."
           addonBefore={filterGlyphicon} />
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
