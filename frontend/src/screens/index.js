/** @flow */

import React from 'react';
import AppScreen from './AppScreen';

export class MainScreen extends React.Component {
  render () {
    const state = this.props.state;

    return <AppScreen state={state} />;
  }
}
MainScreen.propTypes = {
  state: React.PropTypes.object.isRequired
};
