/* @flow */

import React    from 'react';
import ReactDOM from 'react-dom';

const target = document.getElementById('root');

export const createRenderer = (AppContainer, effects) => {
  return appData => {
    ReactDOM.render(
      (<AppContainer appData={appData} effects={effects} />),
      target);
  }
};
