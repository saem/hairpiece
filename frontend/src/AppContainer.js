/* @flow */

import React from 'react';
import events from './application/events';
import { MainScreen } from './screens';

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

    return (
      <MainScreen state={state} />
    );
  }

  componentDidMount () {
    const me = this;
    this.props.stateManager.on('update', () => me.forceUpdate() );
  }
}
AppContainer.propTypes = {
  stateManager: React.PropTypes.object.isRequired
};
