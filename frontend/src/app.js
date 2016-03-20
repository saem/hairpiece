/* @flow */

import {
  init,
  AppContainer
} from './AppContainer';
import './styles/core.scss';
import { createFreezer } from './freezer';

import { createHistory } from './history';
import { createRenderer } from './render';

// State
const defaultState = init();
const initialState = module.hot && module.hot.data && module.hot.data.state ?
  module.hot.data.state :
  defaultState;

let state = createFreezer(initialState);

// History
const history = createHistory(state);
state.getListener().on('navigate', args => history.push(args));

// Rendering
const renderer = createRenderer(AppContainer);

state.getListener().on('update', newState => {
  state = newState;
  renderer(state);
});

renderer(state);

// we can safely accept ourselves, as we export nothing
module.hot && module.hot.accept() &&

// push the old state onto module.hot.data so we can make that initialState
module.hot.dispose((data) => {
  data.state = state.toJS();
});

// todo list:
// - more UI features
// - add in persistence via HTTP
