import React from 'react';

export default class EventDetails extends React.Component {
  render() {
    return (
      <div>Event Details for event {this.props.params.eventId}</div>
    );
  }
}
