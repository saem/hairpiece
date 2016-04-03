/** @flow */

import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const Component = (state: Object): { View: Function } =>
  props => (
    <h1>Settings Details, set stuff here</h1>
  );

export const initState = (initialState: any) =>
  initialState || {};
