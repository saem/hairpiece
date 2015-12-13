/* @flow */

import React from 'react';
import events from './application/events';
import { MainScreen } from './screens';

export default class AppContainer extends React.Component {
  constructor () {
    super();
  }

  componentWillMount () {
    if ( !this.props.stateManager.get().initialized ) {
      this.props.clientLog.onNext({
        type: events.Type.Http,
        method: "GET",
        url: "doesn't matter right now"
      });
    }
  }

  render () {
    return (
      <MainScreen state={this.props.stateManager.get()}
           clientLog={this.props.clientLog}
           serverLog={this.props.serverLog} />
    );
  }

  componentDidMount () {
    const me = this;
    this.props.stateManager.on('update', () => me.forceUpdate() );
  }
}
AppContainer.propTypes = {
  stateManager: React.PropTypes.shape({
    get: React.PropTypes.func.isRequired
  }).isRequired,
  clientLog: React.PropTypes.object.isRequired,
  serverLog: React.PropTypes.object.isRequired
};
