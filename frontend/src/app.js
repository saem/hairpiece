/* @flow */

import React    from 'react';
import ReactDOM from 'react-dom';
import {
  AppContainer,
  initStateManager,
  defaultState
} from './AppContainer';
import './styles/core.scss';
import Kefir from 'kefir';

const initialState = module.hot && module.hot.data ?
  module.hot.data.state :
  defaultState;
const stateManager = initStateManager(initialState);

const target = document.getElementById('root');

const mockApiResponse = {
  "links": {
    "self": "/api",
    "login": "/api/login"
  },
  "data": {
    "type": "api",
    "id": "1",
    "attributes": {}
  }
};

const lag = 1000; //ms
const initApi = (stateManager) => {
  Kefir.constant(false).merge(initApiHttp()).onValue(apiResponse =>
    stateManager.get().set('api', apiResponse));
};
const initApiHttp = () => {
  return Kefir.later(lag, mockApiResponse);
};
initApi(stateManager);

ReactDOM.render(
  (<AppContainer stateManager={stateManager} />),
  target);

// we can safely accept ourselves, as we export nothing
module.hot && module.hot.accept() &&

// push the old state onto module.hot.data so we can make that initialState
module.hot.dispose((data) => {
  data.state = stateManager.get().toJS();
});

// @todo use GET to fetch state from the server when the app init

// App starts in app.js (this file)
// app.js knows the first time it starts (because hot module reload business)
// app.js -> * init_application
  // init_application -> first http request to get API data
    // API data: { current_user, refs, recent_meetings, current_metrics }

class PostOffice {
  constructor(emitter) {
    this.emitter = emitter;
  }
  send(message, address) { this.emitter.emit({ address, message }); }
  mailbox(address) { return new Mailbox(this, address); }
}

class Mailbox {
  constructor(postOffice, address) {
    this.postOffice = postOffice;
    this.address = address || 'anon';
  }
  send(message) { this.postOffice.send(message, this.address); }
  forwardTo(suffix) {
    return new Mailbox(this.postOffice, this.address + '.' + suffix);
  }
}

function update(initialState, action) {
  return (Array.isArray(initialState)) ?
    initialState.push(action) :
    [initialState, action];
}

function emitterTest() {
  let postOffice;
  const stream = Kefir.stream(emitter => {
    postOffice = new PostOffice(emitter);
  });

  stream.log();
  stream.offLog();

  return { stream, postOffice };
}

const { stream, postOffice } = emitterTest();

stream.scan(update).log();

stream.log();
console.log(postOffice);
const app = postOffice.mailbox('app');
app.send('application init');
const sidebar = app.forwardTo('sidebar');
sidebar.send('meeting 13 selected');
const detail = app.forwardTo('detail');
  const meeting = detail.forwardTo('meeting');
    const metrics = meeting.forwardTo('metrics');
      const work = metrics.forwardTo('work');
work.send('work metric set to better');
