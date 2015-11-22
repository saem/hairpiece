import React from 'react';

export class Detail extends React.Component {
  render () {
    return (
      <h1>Select a meeting, or something, whatevs</h1>
    );
  }
}
Detail.propTypes = {
  state : React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
};
