/* @flow */

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Freezer  from 'freezer-js';
import { initApi } from './http';
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

export const Component = (stateManager: StateManager): { View: Function, intents: any} => {
  const state = stateManager.get();
  const uiState = state.ui;
  const { View: AppView,      intents: appIntents      } = App(uiState.app);
  const { View: SettingsView, intents: settingsIntents } = Settings(uiState.settings);
  const { View: HomeView,     intents: homeIntents     } = Home(uiState.home);
  const { View: MeetingView,  intents: meetingIntents  } = Meeting(uiState.meeting);

  // httpObservable = giveToHttper(Kefir.merge([appIntents[AppAction.Start], ...]));
  // appObserveHttp(httpObservable);
  // settingsObserveHttp(httpObservable);
  // homeObserveHttp(httpObservable);

  return {
    View: (props): any => (
        <Router history={props.history}>
          <Route path="/" component={AppView}>
            <IndexRoute component={HomeView} />
            <Route path="settings" component={SettingsView} />
            <Route path="meetings" component={MeetingView} />
          </Route>
        </Router>
      ),
    intents: {
      init_application: () => initApi().onValue(v => {
        state.api.set({ initialized: true })
      })
    }
  };
};

type StateManager = Freezer;

export const initStateManager = (initialState: ?Object): StateManager =>
  new Freezer(initialState || defaultState);

export const defaultState: Object = {
  api: {
    initialized: false
  },
  ui: {
    app: appState(),
    settings: settingsState(),
    home: homeState(),
    meeting: meetingState()
  }
};
