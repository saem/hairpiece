/* @flow */

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Freezer  from 'freezer-js';
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
  const state = stateManager.get().ui;
  const { View: AppView,      intents: appIntents      } = App(state.app);
  const { View: SettingsView, intents: settingsIntents } = Settings(state.settings);
  const { View: HomeView,     intents: homeIntents     } = Home(state.home);
  const { View: MeetingView,  intents: meetingIntents  } = Meeting(state.meeting);

  console.log('here');
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
    intents: {}
  };
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
