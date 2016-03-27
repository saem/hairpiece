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

const freezer = createFreezer(initialState);
let state = freezer.get();

// History
const history = createHistory(location => {
  // Listen for changes to the current location. The
  // listener is called once immediately.
  console.log('history', location);

  state.set({location}).now();
});
freezer.on('navigate', args => {
  console.log('navigate', args);
  history.push(args);
});
freezer.get().getListener().on('navigate', a => console.log(a));
state.getListener().on('navigate', a => console.log(a));

// Rendering
const renderer = createRenderer(AppContainer);

freezer.on('update', newState => {
  console.log('update', newState);
  state = newState;
  renderer(state);
});
state.getListener().on('update', a => console.log(a));
freezer.get().getListener().on('update', a => console.log(a));

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
