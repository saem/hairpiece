/* @flow */

import React    from 'react';
import ReactDOM from 'react-dom';
import {
  AppContainer
} from './AppContainer';
import './styles/core.scss';
import { createHistory } from 'history';
import Kefir from 'kefir';

const defaultState = {};
const initialState = module.hot && module.hot.data ?
  module.hot.data.state :
  defaultState;

const target = document.getElementById('root');

const appData = {
  meetings: [
    {id: 1, name: 'Meeting 1', person: 'andrew'}
  , {id: 2, name: 'Meeting 2', person: 'saem'}
  , {id: 3, name: 'Meeting 3', person: 'michael'}
  ]
  , pages: {
    location: undefined,
    data: {}
  }
};

const dispatchFactory = (action) => {
  return () => {
    onAction(action);
  };
}

Kefir.emitter = () => {
  let emitter;
  const stream = Kefir.stream(_emitter => {
    emitter = _emitter;
    return () => emitter = null;
  });

  stream.emit = x => {
    emitter && emitter.emit(x);
    return stream;
  }

  // TODO: other methods .error, .end, .emitEvent if needed

  return stream;
};

const render = appData => {
  ReactDOM.render(
    (<AppContainer appData={appData} dispatchFactory={dispatchFactory} />),
    target);
};

const history = createHistory();
const historyEmitter = Kefir.emitter();

// Listen for changes to the current location. The
// listener is called once immediately.
const unlisten = history.listen(location => {
  historyEmitter.emit(location);
});

const onAction = action => {
  actionEmitter.emit(action);
};

const actionEmitter = Kefir.emitter();

const navigate = (location) => {
  history.push(location);
}

const actionProcessor = action => {
  switch(action.actionType) {
    case 'navigate_new_meeting':
      navigate({ pathname: '/new_meeting' });
      break;
    case 'new_meeting':
      appData.new_meeting = {
        data : {
          reportedMetrics: [
            {metric: 'work',       value: 'same'},
            {metric: 'company',    value: 'same'},
            {metric: 'team',       value: 'same'},
            {metric: 'individual', value: 'same'},
            {metric: 'manager',    value: 'same'}
          ],
          validMetricValues: ['better', 'same', 'worse'],
          notes: {
            format: 'text',
            value: ''
          }
        }
      };
      break;
    case 'home':
      appData.location = action.location;
      break;
    default:
      console.log('unhandled action');
  };
};

historyEmitter.onValue(location => {
  appData.location = location;
});

historyEmitter.map(location => {
    return location.pathname == '/new_meeting' ?
      {actionType: 'new_meeting', location} :
      {actionType: 'home', location};
  })
  .merge(actionEmitter).onValue(x => {
    console.log('emittiest', x);
    actionProcessor(x);
    //force re-render
    render(appData);
  });

render(appData);

// we can safely accept ourselves, as we export nothing
module.hot && module.hot.accept() &&

// push the old state onto module.hot.data so we can make that initialState
module.hot.dispose((data) => {
  data.state = {};
});

// todo list:
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
