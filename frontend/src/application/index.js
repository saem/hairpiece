import React from 'react';
import Freezer from 'freezer-js';
import Kefir from 'kefir';

const Actions = {
  start:  'application_start'
};

export const Component = (stateManager) =>
  ({
    View: (props) => ( <h1>App View</h1> ),
    intents: {
      [Actions.start]: Kefir.constant({
            action: Actions.start,
            payload: { state: stateManager.get() }
          })
          .filter(intent => !intent.payload.state.initialized)
    }
  });

const defaultState = {
  status: 'uninitialized',
  settings: {
    app: {
      name: "Hair Piece",
      api:  "https://www.hairpiece.com/api"
    }
  }
};

export const stateManager = (initialState) =>
  new Freezer(initialState || defaultState);
