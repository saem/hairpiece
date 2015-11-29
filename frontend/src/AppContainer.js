/* @flow */

import React from 'react';
import events from './application/events';
import UninitializedAppScreen from './screens/UninitializedAppScreen';
import AppScreen from './screens/AppScreen';

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
    const state: Object = this.props.stateManager.get();

    return state.initialized ?
      ( <AppScreen state={state} /> ) :
      ( <UninitializedAppScreen /> );
  }

  componentDidMount () {
    const me = this;
    this.props.stateManager.on('update', () => me.forceUpdate() );
  }
}
AppContainer.propTypes = {
  stateManager: React.PropTypes.object.isRequired
};
