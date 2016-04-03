/* @flow */

import {
  init,
  AppContainer
} from './AppContainer';

import './styles/core.scss';

import { createFreezer } from './freezer';

import { createHistory } from './history';
import { createRenderer } from './render';

import { setupEffects } from './effects';

// State
const defaultState = init();
const initialState = module.hot && module.hot.data && module.hot.data.state ?
  module.hot.data.state :
  defaultState;

const freezer = createFreezer(initialState);
let state = freezer.get();

// History
const history = createHistory(freezer);
state.getListener().on('navigate', args => {
  //console.log('navigate', args);
  history.push(args);
});

// App helpers to trigger effects
const effects = setupEffects(freezer);

// Rendering
const renderer = createRenderer(AppContainer, effects);

freezer.on('update', newState => {
  //console.log('update', newState);
  state = newState;
  renderer(newState);
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
