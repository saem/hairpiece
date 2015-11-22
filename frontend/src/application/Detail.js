import React from 'react';

export class Detail extends React.Component {
  static PropTypes = {
    state : React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired
  }
  
  render () {
    return (
      <h1>Select a meeting, or something, whatevs</h1>
    );
  }
}
