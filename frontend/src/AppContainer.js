/* @flow */

import React from 'react';
import _ from 'lodash';
import {
  Grid, Row, Col
  , ButtonGroup, Button
} from 'react-bootstrap';
import { MyMeetings } from './MyMeetings';

const createAction = (name, optionalArgs) => {
  const args = optionalArgs || {};

  return _.merge({ actionType: name }, args);
}

export const AppContainer = ({appData, dispatchFactory}) => {
  return (
    <Grid>
      <Row className="show-grid">
        <Col md={8} mdOffset={2} >
          <Row>
            <HomeControls home={appData} dispatchFactory={dispatchFactory} />
          </Row>
          <Row>
            <MyMeetings meetings={appData.meetings}
                        dispatchFactory={dispatchFactory} />
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};

const HomeControls = ({home, dispatchFactory}) => {
  const newMeeting = dispatchFactory(createAction('new_meeting'));

  return (
    <ButtonGroup vertical block>
      <NewMeeting newMeeting={newMeeting}/>
    </ButtonGroup>
  );
};

const NewMeeting = ({newMeeting}) => {
  return (
    <Button onClick={newMeeting}>
      New Meeting
    </Button>
  );
}
