import React    from 'react';
import ReactDOM from 'react-dom';

const target = document.getElementById('root');

export const createRenderer = (AppContainer) => {
  return appData => {
    ReactDOM.render(
      (<AppContainer appData={appData} />),
      target);
  }
};
