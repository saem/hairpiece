import React from 'react';
import AppScreen from './AppScreen';
import LoadingScreen from './LoadingScreen';

class MainScreen extends React.Component {
  render () {
    return this.props.initialized ? <AppScreen state={this.props.state} /> :
      <LoadingScreen />;
  }
}
MainScreen.proptTypes = {
  state: React.PropTypes.shape({
    initialized: React.PropTypes.bool.isRequired
  }).isRequired
};

export { MainScreen as MainScreen }
