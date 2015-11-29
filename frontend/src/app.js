/* @flow */

import React              from 'react';
import ReactDOM           from 'react-dom';
import { default as App } from './AppContainer';
import state              from './application/state';
import persistence        from './application/persistence';
import 'styles/core.scss';

const target = document.getElementById('root');
const isHotLoadAndHaveData = module.hot && module.hot.data;
const initialState = isHotLoadAndHaveData ?
  hot.module.data :
  {
    settings: {
      app: {
        name: "Hair Piece"
      }
    },
    initialized: false
  };
const stateManager = state(initialState);
const persister = persistence(stateManager);

ReactDOM.render((
    <App stateManager={stateManager} />
  ), target);

if (module.hot) {
  // we can safely accept ourselves, as we export nothing
  module.hot.accept();
  
  // push the old state onto module.hot.data so we can make that initialState
  module.hot.dispose((data) => {
    console.log(data);
    data = stateManager.get().toJs;
  });
}
