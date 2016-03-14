import React    from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './AppContainer';

const target = document.getElementById('root');

export const createRenderer = dispatcher => {
  return appData => {
    ReactDOM.render(
      (<AppContainer appData={appData}
                     dispatcher={dispatcher} />),
      target);
  }
};
