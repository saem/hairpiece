/* @flow */

import React    from 'react';
import ReactDOM from 'react-dom';
import {
  AppContainer
} from './AppContainer';
import './styles/core.scss';

const defaultState = {};
const initialState = module.hot && module.hot.data ?
  module.hot.data.state :
  defaultState;

const target = document.getElementById('root');

const dispatchFactory = (action) => {
  return () => {
    onAction(action);
  };
}

const onAction = action => {
  console.log(action);

  switch(action.actionType) {
    case 'new_meeting':
      console.log('this is a new meeting specific action');
    break;
    default:
      console.log('unhandled action', action);
  }
};

const appData = {
  meetings: [
    {id: 1, name: 'Meeting 1', person: 'andrew'}
  , {id: 2, name: 'Meeting 2', person: 'saem'}
  , {id: 3, name: 'Meeting 3', person: 'michael'}
  ]
};

// @todo embelish with actions here

ReactDOM.render(
  (<AppContainer appData={appData} dispatchFactory={dispatchFactory} />),
  target);

// we can safely accept ourselves, as we export nothing
module.hot && module.hot.accept() &&

// push the old state onto module.hot.data so we can make that initialState
module.hot.dispose((data) => {
  data.state = {};
});

// todo list:
// - Figure out if we want to rehash elm
// - more UI features
// - add in persistence via HTTP

// Elm rehash prototype

const fooView = ({dispatcher}) => {
  return (
    <foo>
      <M dispatcher={dispatcher.forwardTo('M')} />
      <S dispatcher={dispatcher.forwardTo('S')} />
    </foo>
  );
}

const fooUpdate = (action, state) => {
  switch(action.type) {
    case 'foo':
    //handle here
    break;
    case 'M.clicked':
      return {
        M: mUpdate(action),
        S: sUpdate({type: 'write_code', args: action.args})
      };
  }
};

const M = ({counter, dispatcher}) => {
  return (<Button onClick={dispatcher.dispatch('clicked', {})}>Click Me ({counter})</Button>);
}

const mUpdate = (action, state) => {
  return {counter: state.counter + 1};
}
