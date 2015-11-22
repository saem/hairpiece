import React from 'react';

export class Overview extends React.Component {
  static PropTypes = {
    state : React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired
  }
  
  render () {
    const meetings = this.props.state.pastMeetings.data.map((m) => ( 
        <h1 key={m.id}>{m.attributes.themes}</h1>
      )
    );
    
    return (
      <span className="pastMeetings">
        {meetings}
      </span>
    );
  }
}
