import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { joinEvent, leaveEvent, hideEvent } from '../actions/actions';

export class EventDetails extends Component {
  /**
   * Current user will join the current event
   * @return {undefined} 
   */
  onClickJoin() {
    this.props.joinEvent(this.props.currentEvent.id, this.props.currentUser.id);
  }

  /**
   * Current user will leave the current event if they have joined
   * @return {undefined}
   */
  onClickLeave() {
    this.props.leaveEvent(this.props.currentEvent.id, this.props.currentUser.id)
  }

  /**
   * Current event will be hidden from the current user
   * @return {undefined}
   */
  onClickHide() {
    this.props.hideEvent(this.props.currentEvent.id, this.props.currentUser.id);
    browserHistory.push('/EventList');
  }

  /**
   * Return the user to the previous page
   * @return {undefined} 
   */
  onClickBack() {
    browserHistory.push('/')
  }

  render() {
    return (
      <div className="event-details">
        <h1>Pulse</h1>

        <div>
          {this.props.currentEvent.guests.some(guest => 
            guest.id === this.props.currentUser.id || this.props.currentEvent.created_by === this.props.currentUser.id
          )
            ? <button
              onClick={this.onClickLeave.bind(this)}
              type="button"
              className="btn btn-danger">Leave</button>

            : <div>
              <button
                onClick={this.onClickJoin.bind(this)}
                type="button" 
                className="btn btn-primary">Join</button>
              <button 
                onClick={this.onClickHide.bind(this)}
                type="button" 
                className="btn btn-default">Hide</button>
            </div>
          }
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

        <div>
          <button className="btn btn-primary">Chat</button>
          <button 
            onClick={this.onClickBack.bind(this)}
            type="button"
            className="btn btn-danger">Back</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser:  state.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinEvent, leaveEvent, hideEvent
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
