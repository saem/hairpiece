/* @flow */

import React from 'react';
import _ from 'lodash';
import {
    Input
  , ListGroup, ListGroupItem
  , Glyphicon
} from 'react-bootstrap';

export const myMeetingsInit = () => {
  return {
    filter: '',
    list: [
      {id: 1, name: 'Andrew Weekly', person: 'andrew'}
    , {id: 2, name: 'Saem Weekly', person: 'saem'}
    , {id: 3, name: 'Skip Level', person: 'michael'}
    ]
  };
};

export const MyMeetings = ({meetings}) => {
  const onFilterValue = value => {
      meetings.set({filter: value});
    };

  const visibleMeetings = meetings.list.filter(
    i => i.name.startsWith(meetings.filter));

  return (
    <span>
      <MeetingFilter onFilterValue={onFilterValue} />
      <MeetingList meetings={visibleMeetings} />
    </span>
  );
};

const MeetingFilter = ({onFilterValue}) => {
  const onFilterInput = (event) => {
    const untrimedValue = event.target.value || '';
    onFilterValue(untrimedValue.trim());
  };

  return <MeetingFilterView onFilterInput={onFilterInput} />
};

const MeetingFilterView  = ({onFilterInput}) => {
  const filterGlyphicon = <Glyphicon glyph="search" />;

  return (
    <Input type="text"
           placeholder="Filter meetings by user ..."
           addonBefore={filterGlyphicon}
           onChange={onFilterInput} />
  );
};

const MeetingList = (props) => {
  const meetings = _.map(
    props.meetings,
    m => (<MeetingListItem key={m.id} meeting={m} />)
  );

  return (
    <ListGroup>
      {meetings}
    </ListGroup>
  );
};

const MeetingListItem = ({meeting}) => {
  const onMeetingSelected = (raw) => { console.log('meeting selected', raw); };

  return <MeetingListItemView meeting={meeting} onMeetingSelected={onMeetingSelected}/>
};

const MeetingListItemView = ({meeting, onMeetingSelected}) => {
  return (
    <ListGroupItem onClick={onMeetingSelected}>
      {meeting.name}
    </ListGroupItem>
  );
};
