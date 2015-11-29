/* @flow */

import React from 'react';
import events from 'application/events';
import UninitializedApplication from 'application/UninitializedApplication';
import Application from 'application/Application';
import 'styles/core.scss';

export default class AppContainer extends React.Component {
  constructor () {
    super();
  }
  
  componentWillMount () {
    this.props.stateManager.get()
      .getListener()
      .trigger(events.APPLICATION_INIT);
  }

  render () {
    const state = this.props.stateManager.get();

    return state.initialized ?
      ( <Application state={state} /> ) :
      ( <UninitializedApplication /> );
  }

  componentDidMount () {
    const me = this;
    this.props.stateManager.on('update', () => me.forceUpdate() );
  }
}
AppContainer.propTypes = {
  stateManager: React.PropTypes.object.isRequired
};
