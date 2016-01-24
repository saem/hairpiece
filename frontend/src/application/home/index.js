/** @flow */

import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const Component = (state: Object): Function =>
  props => (<h1>Message of the Day</h1>);

export const initState = (initialState: any) =>
  initialState || {};
