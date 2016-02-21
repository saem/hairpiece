/* @flow */

import React from 'react';
import _ from 'lodash';

const createAction = (name, optionalArgs) => {
  const args = optionalArgs || {};

  return _.merge({ actionType: name }, args);
}

export const NewMeeting = ({dispatchFactory}) => {
  return (
    <h1>New Meeting Form</h1>
  );
}
