/* @flow */

import React              from 'react';
import ReactDOM           from 'react-dom';
import Rx                 from 'rx';
import { default as App } from './AppContainer';
import state              from './application/state';
import persistence        from './application/persistence';
import './styles/core.scss';

const target = document.getElementById('root');
const initialState = module.hot && module.hot.data ?
  module.hot.data :
  {
    settings: {
      app: {
        name: "Hair Piece"
      }
    },
    initialized: false
  };
const stateManager = state(initialState);
const clientLog = new Rx.Subject();
const serverLog = new Rx.Subject();

persistence(clientLog, serverLog);

ReactDOM.render((
    <App stateManager={stateManager}
         clientLog={clientLog}
         serverLog={serverLog} />
  ), target);

// we can safely accept ourselves, as we export nothing
module.hot && module.hot.accept() &&

// push the old state onto module.hot.data so we can make that initialState
module.hot.dispose((data) => {
  data = stateManager.get().toJs;
});
