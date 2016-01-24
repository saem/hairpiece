/* @flow */

import React from 'react';
import _ from 'lodash';
import {
  Grid, Row, Col
  , ButtonGroup, Button
  , Input
  , ListGroup, ListGroupItem
  , Glyphicon
} from 'react-bootstrap';

const createAction = (name, optionalArgs) => {
  const args = optionalArgs || {};

  return _.merge({ actionType: name }, args);
}

export const AppContainer = (props) => {
  return (
    <Grid>
      <Row className="show-grid">
        <Col md={8} mdOffset={2} >
          <Row>
            <HomeControls home={props.appData} dispatchFactory={props.dispatchFactory} />
          </Row>
          <Row>
            <MyMeetings meetings={props.appData.meetings} dispatchFactory={props.dispatchFactory} />
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};

const HomeControls = (props) => {
  const homeWithActions = {
    data: props.home,
    actions: {
      newMeetingClicked: props.dispatchFactory(createAction('new_meeting'))
    }
  };

  const home = homeWithActions;

  return (
    <ButtonGroup vertical block>
      <Button onClick={home.actions.newMeetingClicked}>New Meeting</Button>
    </ButtonGroup>
  );
};

const MyMeetings = (props) => {
  const meetingsWithActions = _.map(
    props.meetings,
    m => {
      return {
        data:    m,
        actions: {
          meetingClicked: props.dispatchFactory(createAction('meeting_clicked', {meeting:m}))
        }
      };
    }
  );

  const meetings = meetingsWithActions;

  const filterGlyphicon = <Glyphicon glyph="search" />;

  return (
    <span>
      <Input type="text" placeholder="Filter meetings by user ..." addonBefore={filterGlyphicon} />
      <MeetingList meetings={meetings} />
    </span>
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

const MeetingListItem = (props) => {
  const meeting = props.meeting;

  return (
    <ListGroupItem onClick={meeting.actions.meetingClicked}>
      {meeting.data.name}
    </ListGroupItem>
  );
};
