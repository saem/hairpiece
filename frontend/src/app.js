import React              from 'react';
import ReactDOM           from 'react-dom';
import { default as App } from 'application';
import state              from 'application/state';
import persistence        from 'application/persistence';

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
  console.log('Module is hot: app');
  // we can safely accept ourselves, as we have no exports
  module.hot.accept();

  // push the old state onto module.hot.data so we can make that initialState
  module.hot.dispose((data) => {
    console.log(data);
    data = stateManager.get().toJs();
  });
}
