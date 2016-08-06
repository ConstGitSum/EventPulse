import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import ChatWindow from './Chat'
import Sidebar from './Sidebar';
import { 
  joinEvent,
  leaveEvent, 
  hideEvent, 
  unhideEvent 
} from '../actions/actions';

export class EventDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      sidebarToggle: false
    }
  }
  
  /**
   * Current user will join the current event
   */
  onClickJoin() {
    this.props.joinEvent(this.props.currentEvent.id, this.props.currentUser.id)
      .then()
      .catch(err => console.log('ERROR - onClickJoin:', err))
  }

  /**
   * Current user will leave the current event if they have joined
   */
  onClickLeave() {
    this.props.leaveEvent(this.props.currentEvent.id, this.props.currentUser.id)
      .then()
      .catch(err => console.log('ERROR - onClickLeave:', err))
  }

  /**
   * Return the user to the previous page
   */
  onClickBack() {
    browserHistory.push('/')
  }

  /**
   * Check state to see if sidebar has been toggled and then invert state
   */
  showHideSidebar() {
    if (this.state.sidebarToggle) {
      this.setState({ sidebarToggle: false });
    } else {
      this.setState({ sidebarToggle: true });
    };
  }

  generateButton(text, className, onClickFunction) {
    return (
      <button
        onClick={onClickFunction}
        type="button"
        className={className}>
        {text}
      </button>
    )
  }

  render() {
    {/* Check to see if the event was created by the current user */}
    const creator = this.props.currentEvent.guests.find(guest => {
      return guest.id === this.props.currentEvent.created_by});
    const max_guests = this.props.currentEvent.max_guests === null 
      ? '∞' 
      : this.props.currentEvent.max_guests

    return (
      <div className="event-details">
        <Sidebar />
        <h1>Pulse</h1>
        <div>
        {/* check if current user is already a guest
              True : Display Leave button
              False: Check if event has been hidden*/}
        {this.props.currentEvent.guests.some(guest => 
          guest.id === this.props.currentUser.id)
        ? this.generateButton('Leave', 'btn btn-danger', this.onClickLeave.bind(this))
        /* check if current event has been hidden
              True : Display Unhide button
              False: Display Join and Hide buttons */    
        : this.props.hiddenEvents.indexOf(this.props.currentEvent.id) === -1
          ? this.generateButton('Join', 'btn btn-primary', this.onClickJoin.bind(this))
          : null
        }      
        </div>

        <div>
          <p>Attendance: {this.props.currentEvent.guests.length}/{max_guests}</p>
          <p>Creator: {creator ? creator.name : 'No longer in event'}</p>
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
            className="btn btn-danger">
            Back
          </button>
        </div>
        
    <ChatWindow event = {this.props.currentEvent}/>
           </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser:  state.currentUser,
    hiddenEvents: state.hiddenEvents
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinEvent, 
    leaveEvent, 
    hideEvent,
    unhideEvent
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
