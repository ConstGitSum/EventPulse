import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { ProgressBar } from 'react-bootstrap';
import moment from 'moment';
import humanizeDuration from 'humanize-Duration';

import ChatModal from './ChatModal'
import Sidebar from './Sidebar';
import { 
  joinEvent,
  leaveEvent, 
  hideEvent, 
  unhideEvent,
  removeInvitation,
  addInvite, 
  toggleChatModal
} from '../actions/actions';
import DetailsMap from './DetailsMap';

export class EventDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      startTimeObj  : null,
      startTimeText : null,
      startTimeShow : true,
      endTimeObj    : null,
      endTimeText   : null,
      endTimeShow   : true
    }
  }

  componentWillMount() {
    if (!this.props.currentUser) {
      browserHistory.push('/');
    }
    const startTime = moment(this.props.currentEvent.time);
    const endTime   = moment(this.props.currentEvent.endTime);
    this.setState({ 
      startTimeObj  : startTime,
      startTimeText : startTime.format('dddd, h:mm a'),
      endTimeObj    : endTime,
      endTimeText   : endTime.format('dddd, h:mm a')
    });
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

  swapTime(type) {
    if (type === 'start') {
      if (this.state.startTimeShow) {
        this.setState({ 
          startTimeShow: false,
          startTimeText: this.state.startTimeObj.fromNow()
        });
      } else {
        this.setState({ 
          startTimeShow: true,
          startTimeText: this.state.startTimeObj.format('dddd, h:mm a')
        });
      }
    } else {
      if (this.state.endTimeShow) {
        this.setState({ 
          endTimeShow: false,
          endTimeText: this.state.endTimeObj.fromNow()
        });
      } else {
        this.setState({ 
          endTimeShow: true,
          endTimeText: this.state.endTimeObj.format('dddd, h:mm a')
        });
      }
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
    const currentEvent  = this.props.currentEvent;
    const currentUser   = this.props.currentUser;
    const hiddenEvents  = this.props.hiddenEvents;
    const guestLength   = currentEvent.guests.length;
    const max_guests    = currentEvent.max_guests;

    const isEventHidden = hiddenEvents.indexOf(currentEvent.id) !== -1
    const isUserInEvent = currentEvent.guests.some(guest =>
      guest.id === currentUser.id || currentEvent.created_by === currentUser.id)

    if (isUserInEvent) {
      return (
        this.generateButtons(
          'Leave',
          'btn btn-danger btn-block btn-lg',
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
    const max_guests = this.props.currentEvent.max_guests === -1 
      ? '∞' 
      : this.props.currentEvent.max_guests;
    const currentAttending = this.props.currentEvent.guests.length;
    const spotsRemaining = max_guests === '∞'
      ? '∞'
      : max_guests - currentAttending;
    const attendancePercentage = max_guests === '∞' 
      ? 0
      : currentAttending / max_guests * 100;

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
            <div className="col-xs-10 col-xs-offset-1 text-center">
              <ProgressBar>
                <ProgressBar 
                  bsStyle="info"
                  now={attendancePercentage} 
                  label={`${currentAttending}/${max_guests}`}
                  key={1} />
                <ProgressBar 
                  bsStyle="danger" 
                  now={100-attendancePercentage} 
                  key={2}
                  label={`${spotsRemaining} spots remaining`} />
              </ProgressBar>
            </div>
          </div>

          <DetailsMap />

          <div className="row">
            <div id="event-location" className="col-xs-10 col-xs-offset-1 text-center">
              <h4>
                <strong>{this.props.currentEvent.location}</strong>
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 text-center" role="group">
              {this.renderButtons()}
            </div>
          </div>

          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
              <table className="details-table">
                <tr>
                  <td className="table-heading"><strong>Created By</strong></td>
                  <td className="table-heading align-white"><strong> : </strong></td>
                  <td className="table-info">{creator ? creator.name : "Creator is no longer in the event"}</td>
                </tr>
                <tr>
                  <td className="table-heading"><h4><strong>Category</strong></h4></td>
                  <td className="table-heading align-white"><strong> : </strong></td>
                  <td className="table-info capitalize">{this.props.currentEvent.category}</td>
                </tr>
                <tr>
                  <td className="table-heading"><h4><strong>Description</strong></h4></td>
                  <td className="table-heading align-white"><strong> : </strong></td>
                  <td className="table-info">{this.props.currentEvent.description}</td>
                </tr>
                <tr>
                  <td className="table-heading"><h4><strong>Duration</strong></h4></td>
                  <td className="table-heading align-white"><strong> : </strong></td>
                  <td className="table-info">{humanizeDuration(this.props.currentEvent.duration * 1000)}</td>
                </tr>
                <tr onClick={this.swapTime.bind(this, 'start')}>
                  <td className="table-heading"><h4><strong>Start Time</strong></h4></td>
                  <td className="table-heading align-white"><strong> : </strong></td>
                  <td className="table-info">{this.state.startTimeText}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="row footer">
            <div className="col-xs-10 col-xs-offset-1 text-center" role="group">
              {this.generateButtons(
                "Chat",
                'btn btn-primary btn-block btn-lg', 
                this.props.toggleChatModal
                )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <ChatModal/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentEvent : state.currentEvent,
    currentUser  : state.currentUser,
    hiddenEvents : state.hiddenEvents,
    invitations  : state.invitations
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinEvent, 
    leaveEvent, 
    hideEvent,
    unhideEvent,
    removeInvitation,
    addInvite, 
    toggleChatModal
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
