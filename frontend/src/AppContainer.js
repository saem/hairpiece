/* @flow */

import React from 'react';
import { Router, Route } from 'react-router';
import Kefir from 'kefir';
import {
  Component as App,
  stateManager as appStateManager
} from './application';

export const Component = (stateManagers) => {
  const { View: AppView, intents: appIntents } = App(stateManagers.app);

  return {
    View: (props): any => (
        <Router history={props.history}>
          <Route path="/" component={AppView} />
        </Router>
      ),
    intents: {}
  };
};

export const initState = (initialStateManagers) =>
  stateManagers = initialStateManagers || defaultStateManagers;

let stateManagers;

const defaultStateManagers = {
  app: appStateManager()
};
