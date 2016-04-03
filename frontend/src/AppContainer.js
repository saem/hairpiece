/* @flow */

import React from 'react';
import _ from 'lodash';
import {
  Grid, Row, Col
} from 'react-bootstrap';
import { Home, homeInit } from './home/Home';
import { NewMeeting, newMeetingInit } from './meetings/NewMeeting';
import { matchPattern } from './PatternUtils';

export const init = () => {
  return {
    ready : false,
    location: undefined,
    home: homeInit(),
    newMeeting: newMeetingInit(),

    // Global
    subordinates: [{id: '1', name: 'Andrew'}, {id: '2', name: 'Victor'}]
  };
};

export const AppContainer = ({appData, effects}) => {
  const patterns = [
    '/new_meeting/:subordinate_id'
  ];

  let page = <Home appData={appData.home}
                   subordinates={appData.subordinates}
                   effects={effects} />;

  if(appData.location && appData.location.pathname) {
    let match = {remainingPathname: null, paramNames: null};
    const pathname = appData.location.pathname;
    match = _.find(patterns,
        p => matchPattern(p, pathname).remainingPathname != null);

    switch (match) {
      case '/new_meeting/:subordinate_id':
        const props = _.zipObject(match.paramNames, match.paramValues);
        page = <NewMeeting newMeeting={appData.newMeeting}
                           effects={effects}
                           {...props} />;
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
