/* @flow */

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Freezer  from 'freezer-js';
import { initApi } from './http';
import {
  Component as LoadingView
} from './application/loading';
import {
  Component as App,
  initState as appState
} from './application';
import {
  Component as Settings,
  initState as settingsState
} from './application/settings';
import {
  Component as Home,
  initState as homeState
} from './application/home';
import {
  Component as Meeting,
  initState as meetingState
} from './application/meeting';

export class AppContainer extends React.Component {
  render () {
    const props = this.props;
    const state = props.stateManager.get();

    // figure out what to render based on that

    const uiState = state.ui;
    const AppView      = App(uiState.app);
    const SettingsView = Settings(uiState.settings);
    const HomeView     = Home(uiState.home);
    const MeetingView  = Meeting(uiState.meeting);

    return (
        <Router history={browserHistory}>
          <Route path="/" component={AppView}>
            <IndexRoute component={HomeView} />
            <Route path="settings" component={SettingsView} />
            <Route path="meetings" component={MeetingView} />
          </Route>
        </Router>
      );
  }

  componentDidMount () {
    const me = this;
    //this.props.stateManager.on('update', function() { me.forceUpdate() });
  }
}

export const Component = (stateManager: StateManager): { View: Function } => {
  const state = stateManager.get();

  if (!state.api) {
    return {
      View: (props): any => (
        <Router history={props.history}>
          <Route path="/" component={LoadingView} />
        </Router>
      ),
      intents: {}
    };
  }
};

type StateManager = Freezer;

export const initStateManager = (initialState: ?Object): StateManager =>
  new Freezer(initialState || defaultState);

export const defaultState: Object = {
  ui: {
    app: appState(),
    settings: settingsState(),
    home: homeState(),
    meeting: meetingState()
  }
};
