import React from 'react';

export class Overview extends React.Component {
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
Overview.propTypes = {
  state : React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired
};
