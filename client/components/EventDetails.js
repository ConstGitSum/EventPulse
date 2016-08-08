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

export class EventDetails extends Component {
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
    }
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

  generateButtons(text, className, onClickFunction=null) {
    return (
      <button
        onClick={onClickFunction}
        type="button"
        className={className}>
        {text}
      </button>
    )
  }

  renderButtons() {
    const currentEvent = this.props.currentEvent;
    const currentUser = this.props.currentUser;
    const hiddenEvents = this.props.hiddenEvents;

    const isUserInEvent = currentEvent.guests.some(guest =>
      guest.id === currentUser.id || currentEvent.created_by === currentUser.id)
    const isEventHidden = hiddenEvents.indexOf(currentEvent.id) !== -1

    if (isUserInEvent) {
      return (
        this.generateButtons(
        'Leave',
        'ed-btn btn btn-danger',
        this.onClickLeave.bind(this))
      )
    }

    if (!isUserInEvent && !isEventHidden) {
      return (
        <div>
          {this.generateButtons(
            'Join',
            'ed-btn btn btn-primary',
            this.onClickJoin.bind(this))}
          {this.generateButtons(
            'Hide',
            'ed-btn btn btn-default',
            this.onClickHide.bind(this))}
        </div>
      )
    }
  }

  render() {
    {/* Check to see if the event was created by the current user */}
    const creator = this.props.currentEvent.guests.find(guest => {
      return guest.id === this.props.currentEvent.created_by});
    const max_guests = this.props.currentEvent.max_guests === null 
      ? '∞' 
      : this.props.currentEvent.max_guests

    return (
      <div className="container">
              
        <div className="row">
          <div className="col-lg-12 page-header">
            <h1 className="text-center">{this.props.currentEvent.title}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 btn-group text-center" role="group">
            {this.renderButtons()}
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <p>Attendance: #/##</p>
            <p>Creator: {creator ? creator.name :  'no longer in event'}</p>
            {/*<p>Title: {this.props.currentEvent.title}</p>*/}
            <p>Description: {this.props.currentEvent.description}</p>
            <p>Location: {this.props.currentEvent.location}</p>
            <p>Time: {this.props.currentEvent.time}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 btn-group text-center" role="group">
            <div>
              {this.generateButtons(
                "Chat",
                'ed-btn btn btn-primary')}
              {this.generateButtons(
                "Back",
                "ed-btn btn btn-danger",
                this.onClickBack.bind(this))}
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12 text-center">
            <ChatWindow event={ this.props.currentEvent }/>
          </div>
        </div>
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
