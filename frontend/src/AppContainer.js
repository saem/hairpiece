/* @flow */

import React from 'react';
import _ from 'lodash';
import {
  Grid, Row, Col
  , ButtonGroup, Button
} from 'react-bootstrap';
import { MyMeetings } from './MyMeetings';
import { NewMeeting } from './meetings/NewMeeting';

const createAction = (name, optionalArgs) => {
  const args = optionalArgs || {};

  return _.merge({ actionType: name }, args);
}

export const AppContainer = (props) => {
  let page = <Home {...props} />;
  if (props.appData.page.location) {
    switch(props.appData.page.location.pathname) {
      case '/new_meeting':
        page = <NewMeeting {...props} />;
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

const Home = ({appData, dispatchFactory}) => {
  return (
    <span>
      <Row>
        <HomeControls home={appData} dispatchFactory={dispatchFactory} />
      </Row>
      <Row>
        <MyMeetings meetings={appData.meetings}
                    dispatchFactory={dispatchFactory} />
      </Row>
    </span>
  );
}

const HomeControls = ({home, dispatchFactory}) => {
  const newMeeting = dispatchFactory(createAction('new_meeting'));

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
