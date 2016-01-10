/** @flow */

import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const Component = (state: Ojbect): { View: Function, intents: any} => ({
  View: (props) => (
    <h1>Settings Details, set stuff here</h1>
  ),
  intents: {}
});

export const initState = (initialState: any) =>
  initialState || {};
