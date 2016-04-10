/* @flow */

import {
  init,
  AppContainer
} from './AppContainer';

import './styles/core.scss';

import { createRenderer } from './render';

// State
const defaultState = init();
const initialState = module.hot && module.hot.data && module.hot.data.state ?
  module.hot.data.state :
  defaultState;
let state = {};

// Rendering
const renderer = createRenderer(AppContainer);

renderer(state);

// we can safely accept ourselves, as we export nothing
module.hot && module.hot.accept() &&

// push the old state onto module.hot.data so we can make that initialState
module.hot.dispose((data) => {
  data.state = state;
});
