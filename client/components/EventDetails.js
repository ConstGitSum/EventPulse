import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { joinEvent, hideEvent } from '../actions/actions';

export class EventDetails extends Component {
  /**
   * Join the current event by the current user
   * @return {undefined} 
   */
  onEventJoin() {
    this.props.joinEvent(this.props.currentEvent.eventId, this.props.currentUser.userId);
  }

  /**
   * Hide the event from the current user
   * @return {undefined}
   */
  onEventHide() {
    this.props.hideEvent(this.props.currentEvent.eventId, this.props.currentUser.userId);
    browserHistory.push('/EventList');
  }

  render() {
    console.log(this.props.currentEvent)
    return (
      <div className="event-details">
        <h1>Pulse</h1>

        <div className="btn-group btn-primary" role="group">
          <button
            onClick={this.onEventJoin}
            type="button" 
            className="btn btn-primary">Join</button>
          <button 
            onClick={this.onEventHide}
            type="button" 
            className="btn btn-danger">Hide</button>
        </div>

        <div>
          <span className="details">Details:</span>
          <span className="attendance">#/##</span>
        </div>

        <div>
          <p>Title: {this.props.currentEvent.title}</p>
          <p>Description: {this.props.currentEvent.description}</p>
          <p>Location: {this.props.currentEvent.location}</p>
          <p>Time: {this.props.currentEvent.time}</p>
        </div>
        <button className="btn btn-primary">Chat</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser:  state.currentUser,
    guestList:    state.guestList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinEvent, hideEvent
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
