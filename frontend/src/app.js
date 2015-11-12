import React              from 'react';
import ReactDOM           from 'react-dom';
import { default as App } from './application';
import 'styles/core.scss';

const target = document.getElementById('root');

ReactDOM.render((
    <App />
  ), target);
