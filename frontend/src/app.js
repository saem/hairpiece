/* @flow */

import {
  init,
  update
} from './AppContainer';
import './styles/core.scss';

import { historyStream, history, historyListen } from './history';
import { createRenderer } from './render';
import { dispatcher, actionStream } from './actions';

import { Kefir } from './kefir';

const defaultState = { ready: false, appData: {} };
const initialState = module.hot && module.hot.data ?
  module.hot.data.state :
  defaultState;

let appData = init();

const effectEmitter = Kefir.emitter();

const effectProcessor = (history, render) => {
  return effect => {
    switch (effect.effectType) {
      case 'navigate':
        history.push(effect.args);
        break;
      case 'render':
        render(effect.args);
        break;
      case 'ready':
        historyListen();
        break;
      case 'state':
        appData = effect.args;

        //force re-render
        effectDispatcher({effectType: 'render', args: appData});
        break;
      default:
        console.log('unhandled effect', effect);
    }
  };
};

const render = createRenderer(dispatcher);
const effectDispatcher = effect => effectEmitter.emit(effect);

const processAction = action => {
  action.creatorPath = action.creator.split('.');
  return update(effectDispatcher)(action, _.clone(appData));
};

// actions
historyStream
  .merge(actionStream)
  .log('action')
  .map(action => {
    console.log(Date.now());
    return processAction(action);
  })
  .log('state')
  .onValue(state => {
    console.log(Date.now());
    //console.log('action - before', appData.location);
    effectDispatcher({effectType: 'state', args: state });
    //console.log('action - after', appData.location);
  });

const processEffect = effectProcessor(history, render);
effectEmitter.onValue(processEffect);

effectDispatcher({effectType: 'ready'});

// history must listen here

// we can safely accept ourselves, as we export nothing
module.hot && module.hot.accept() &&

// push the old state onto module.hot.data so we can make that initialState
module.hot.dispose((data) => {
  data.state = {ready: true, appData};
});

// todo list:
// - more UI features
// - add in persistence via HTTP
