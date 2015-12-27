/** @flow */

import React from 'react';
import Freezer from 'freezer-js';
import Kefir from 'kefir';
import { Row, Col } from 'react-bootstrap';

export const Component = (stateManager: Freezer): { View: Function, intents: any} => ({
  View: (props) => (
    <h1>Settings Details, set stuff here</h1>
  ),
  intents: {}
});

export const stateManager = (initialState: any) =>
  new Freezer(initialState || {});
