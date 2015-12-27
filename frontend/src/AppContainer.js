/* @flow */

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Kefir from 'kefir';
import {
  Component as App,
  stateManager as appStateManager
} from './application';
import {
  Component as Settings,
  stateManager as settingsStateManager
} from './application/settings';
import {
  Component as Home,
  stateManager as homeStateManager
} from './application/home';
import {
  Component as Meeting,
  stateManager as meetingStateManager
} from './application/meeting';

export const Component = (stateManagers: StateManagers): { View: Function, intents: any} => {
  const { View: AppView,      intents: appIntents      } = App(stateManagers.app);
  const { View: SettingsView, intents: settingsIntents } = Settings(stateManagers.settings);
  const { View: HomeView,     intents: homeIntents     } = Home(stateManagers.home);
  const { View: MeetingView,  intents: meetingIntents  } = Meeting(stateManagers.meeting);

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

type StateManagers = { app: Freezer };

export const initState = (initialStateManagers: ?StateManagers): StateManagers =>
  initialStateManagers || defaultStateManagers;

const defaultStateManagers: StateManagers = {
  app: appStateManager(),
  settings: settingsStateManager(),
  home: homeStateManager(),
  meeting: meetingStateManager()
};
