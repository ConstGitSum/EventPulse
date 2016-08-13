import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import moment from 'moment'

import ChatWindow from './Chat'
import Sidebar from './Sidebar';
import { 
  joinEvent,
  leaveEvent, 
  hideEvent, 
  unhideEvent,
  removeInvitation,
  addInvite
} from '../actions/actions';
import DetailsMap from './DetailsMap';

export class EventDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      timeObj: null,
      timeText: null,
      timeShow: true
    }
  }

  componentWillMount() {
    if (!this.props.currentUser) {
      console.log('you need to log in');
      browserHistory.push('/');
    }
    this.setState({ timeObj: moment(this.props.currentEvent.time) },
      () => this.setState({ timeText: this.state.timeObj.format('dddd, h:mm a')})
    )
  }

  /**
   * Current user will join the current event
   */
  onClickJoin() {
    this.props.joinEvent(this.props.currentEvent.id, this.props.currentUser.id)
      .then(() => {
        if(this.props.invitations.includes(this.props.currentEvent.id)){
          this.props.removeInvitation(this.props.currentEvent.id)
          this.props.addInvite(['remove', this.props.currentUser.id, this.props.currentEvent.id])
        }
      })
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

  swapTime() {
    if(this.state.timeShow) {
      this.setState({ timeShow: false })
      this.setState({ timeText: this.state.timeObj.fromNow() })
    } else {
      this.setState({ timeShow: true })
      this.setState({ timeText: this.state.timeObj.format("dddd, h:mm a") })
    }
  }

  generateButtons(text, className, onClickFunction, disabled=null) {
    return (
      <button
        onClick={onClickFunction}
        type="button"
        className={className}
        disabled={disabled}>
        {text}
      </button>
    )
  }

  renderButtons() {
    const currentEvent = this.props.currentEvent;
    const currentUser = this.props.currentUser;
    const hiddenEvents = this.props.hiddenEvents;
    const guestLength = currentEvent.guests.length;
    const max_guests = currentEvent.max_guests;
    const isUserInEvent = currentEvent.guests.some(guest =>
      guest.id === currentUser.id || currentEvent.created_by === currentUser.id)
    const isEventHidden = hiddenEvents.indexOf(currentEvent.id) !== -1

    if (isUserInEvent) {
      return (
        this.generateButtons(
          'Leave',
          'btn btn-danger btn-block',
          this.onClickLeave.bind(this)
        )
      )
    }

    if (!isUserInEvent && !isEventHidden && guestLength !== max_guests) {
      return (
        this.generateButtons(
          'Join',
          'btn btn-primary btn-block btn-lg',
          this.onClickJoin.bind(this))
      )
    } else {
      return (
        this.generateButtons(
          'Join',
          'btn btn-danger btn-block btn-lg',
          'disabled',
          this.onClickJoin.bind(this)
        )
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
    const currentAttending = this.props.currentEvent.guests.length;

    return (
      <div className="event-details">
        <i
          onClick={this.onClickBack.bind(this)}
          className="back-btn fa fa-arrow-left fa-3x"
          aria-hidden="true"></i>
        <Sidebar />
        
        <div className="container">
          <div className="row">
            <div className="col-xs-12 page-header">
              <h2 className="text-center">{this.props.currentEvent.title}</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 details-map-container">
              <DetailsMap />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 text-center">
              <strong>
                {this.props.currentEvent.location}
              </strong>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 text-center" role="group">
              {this.renderButtons()}
            </div>
          </div>

          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
              <p><strong>Attendance</strong>: {currentAttending}/{max_guests}</p>
              <p><strong>Creator</strong>: {creator ? creator.name :  'No longer in event'}</p>
              <p><strong>Description</strong>: {this.props.currentEvent.description}</p>
              <p onClick={this.swapTime.bind(this)}>
                <strong>Time</strong>: {this.state.timeText}
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 text-center" role="group">
              {this.generateButtons(
                "Chat",
                'btn btn-primary btn-block btn-lg')}
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <ChatWindow  event={this.props.currentEvent}/>
            </div>
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
    hiddenEvents: state.hiddenEvents,
    invitations: state.invitations,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinEvent, 
    leaveEvent, 
    hideEvent,
    unhideEvent,
    removeInvitation,
    addInvite
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
