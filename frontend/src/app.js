/* @flow */

import React                from 'react';
import ReactDOM             from 'react-dom';
import {
  Component as AppContainer,
  initState
} from './AppContainer';
import Kefir                from 'kefir';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import './styles/core.scss';

const initialState = module.hot && module.hot.data ?
  module.hot.data.state :
  null;
let state = initState(initialState);

const history = createBrowserHistory();

const target = document.getElementById('root');

const {View, intents} = AppContainer(state);

ReactDOM.render((<View history={history} />), target);

// we can safely accept ourselves, as we export nothing
module.hot && module.hot.accept() &&

// push the old state onto module.hot.data so we can make that initialState
module.hot.dispose((data) => {
  data.state = state;
});

// @todo use GET to fetch state from the server when the app init
