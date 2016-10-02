import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import moment from 'moment';
import scrollTo from 'jquery.scrollto';

import {
  userLogOut,
  getList,
  setCurrentEvent,
  getHiddenEvents,
  filterList,
  addInvite,
  removeInvitation,
} from '../actions/actions';
import { setLocation } from '../actions/map';
import ListFilter from './ListFilter';
import EventMap from './EventMap';

export class List extends React.Component {
  componentDidMount() {
    // clear current event so no active marker on map
    this.props.setCurrentEvent({});

    // geolocate user's current location
    this.props.setLocation()
    // then get list of events user has chosen to hide
    .then(() => this.props.getHiddenEvents(this.props.currentUser.id))
    // then get list of all events from server
    .then(() => this.props.getList())
    // then filter list based on hiddenEvents and current location
    .then(() => this.props.filterList(
      this.props.list,
      'unhidden',
      this.props.currentUser.id,
      this.props.hiddenEvents,
      this.props.location
    ));

    this.seeInvites = this.seeInvites.bind(this);
  }

  // toggles current event to show/hide additional info and scrolls to it on list
  setCurrentEvent(event, index) {
    if (this.props.currentEvent.id === event.id) {
      this.props.setCurrentEvent({});
    } else {
      this.props.setCurrentEvent(event);
    }
    setTimeout(() => $('.eventList').scrollTo(`li:eq(${index})`, 300), 50);
  }

  // This function checks which friends of yours are going to the event.
  // Will show up to 5 pictures.
  myFriendsGoing(friendsList, guestList) {
    const friendIds = friendsList.map((friendId => friendId.id));
    const friendsGoing = guestList.filter((friendGoing) => friendIds.includes(friendGoing.id));

    return (
      <div>Friends Going: {friendsGoing.length} {friendsGoing.map((friend, index) => {
        if (index < 5) {
          return (
            <img
              className="eventListFriendImage"
              role="presentation"
              key={friend.id}
              src={friend.image}
            />
          );
        }
        return null;
      })}</div>
    );
  }

  // This will filter via invites
  seeInvites() {
    const now = new Date();
    const newList = this.props.list.filter((event) => {
      if (this.props.invitations.includes(event.id)) {
        const then = new Date(event.endTime);
        if (then > now) {
          return true;
        }
        this.props.removeInvitation(event.id);
      }
      return false;
    });

    this.props.filterList(
      newList,
      'invites',
      this.props.currentUser.id,
      this.props.hiddenEvents,
      this.props.location
    );
  }

  // renders one event item
  renderListItem(event, index) {
    return (<li
      key={index}
      className="event-item list-group-item"
      onClick={this.setCurrentEvent.bind(this, event, index)}
    >
      <h3 className="event-title">{event.title}</h3>
      <div className="event-info">
        <span className="event-distance">{event.distance} miles </span>
        <span className="event-time">{moment(event.time).format('h:mm a')} </span>
      </div>
        {/* Show additional info if clicked */}
        {this.props.currentEvent && event.id === this.props.currentEvent.id
        ? <div id="event-info">
          <h4 id="event_location">{event.location}</h4>
          {this.myFriendsGoing(this.props.currentUser.friendsList, event.guests)}
          <div className="text-center view-details">
            <Link
              onClick={(e) => { e.stopPropagation(); }}
              to={`/${event.id}`}
            >
              <button className="btn btn-secondary">
                View Event Details
              </button>
            </Link>
          </div>
        </div>
        : null
      }
    </li>);
  }

  render() {
    return (
      <div className="explore container-fluid text-center">
        <div className="row event-map">
          <EventMap />
          <div className="list col-xs-4 text-left">
            <div className="filterAndInvites">
              <ListFilter />
              {this.props.invitations.length > 0
                ? <button className="inviteNotice" onClick={this.seeInvites}>
                  {this.props.invitations.length}
                </button>
                : null
              }
            </div>
            <div className="eventList">
              <ul className="event-list list-group">
                {this.props.listFiltered.map((event, index) =>
                  this.renderListItem(event, index))}
              </ul>
            </div>

            <div className="event-buttons btn-group footer" role="group">
              <Link to="/create">
                <button className="create-event btn btn-primary">
                  Create
                </button>
              </Link>
              <button
                className="logout btn btn-danger"
                onClick={this.props.userLogOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  setCurrentEvent: PropTypes.func,
  setLocation: PropTypes.func.isRequired,
  getHiddenEvents: PropTypes.func,
  currentUser: PropTypes.any.isRequired,
  getList: PropTypes.func,
  filterList: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  hiddenEvents: PropTypes.array,
  location: PropTypes.object,
  invitations: PropTypes.array,
  removeInvitation: PropTypes.func,
  listFiltered: PropTypes.array.isRequired,
  userLogOut: PropTypes.func,
  currentEvent: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
    list: state.list,
    listFiltered: state.listFiltered,
    hiddenEvents: state.hiddenEvents,
    invites: state.invites,
    invitations: state.invitations,
    location: state.map.currLocation,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setLocation,
    setCurrentEvent,
    getHiddenEvents,
    getList,
    filterList,
    userLogOut,
    addInvite,
    removeInvitation,
  }, dispatch);
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(List);
