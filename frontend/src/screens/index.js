/** @flow */

import React from 'react';
import AppScreen from './AppScreen';
import LoadingScreen from './LoadingScreen';
import Events from '../application/events';

export class MainScreen extends React.Component {
  componentWillMount () {
    this.props.serverLog.filter(e => { return e.type == Events.Type.Http; } )
      .subscribe(({data}) => this.props.state.set({
            me: {
              links: data.links,
              data: data.data
            },
            overview: {
              people: data.included
                .filter(r => r.type == "person")
                .map(p => {
                  let result = {
                    type: p.type,
                    id: p.id,
                    attributes: p.attributes,
                    relationships: p.relationships
                  };

                  result.attributes.fullName = p.attributes.firstName + " "
                    + p.attributes.lastName;

                  return result;
                })
            },
            initialized: true
      }));
  }

  render () {
    const state = this.props.state;
    const clientLog = this.props.clientLog;
    const serverLog = this.props.serverLog;

    return state.initialized ?
      <AppScreen state={state} clientLog={clientLog} serverLog={serverLog} /> :
      <LoadingScreen />;
  }
}
MainScreen.propTypes = {
  state: React.PropTypes.shape({
    initialized: React.PropTypes.bool.isRequired
  }).isRequired
};
