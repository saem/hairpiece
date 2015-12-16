/* @flow */

import React from 'react';
import { MainScreen } from './screens';

export default class AppContainer extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <MainScreen state={this.props.stateManager.get()} />
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
  }).isRequired
};
