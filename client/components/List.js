import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Cell } from 'react-pure';

import { 
  userLogOut, 
  getList, 
  setCurrentEvent, 
  getHiddenEvents,
  filterList,
  addInvite 
} from '../actions/actions';
import { setLocation } from '../actions/map';
import ListFilter from './ListFilter';
import EventMap from './EventMap';

export class List extends React.Component {
  componentDidMount() {
    this.props.setCurrentEvent({});

    this.props.setLocation()
    .then(() => this.props.getHiddenEvents(this.props.currentUser.id))
    .then(() => this.props.getList())
    .then(() => this.props.filterList(
      this.props.list,
      'unhidden',
      this.props.currentUser.id,
      this.props.hiddenEvents,
      this.props.location
    ));
  }

  renderListItem(event, index) {
    return <li 
      key={index} 
      className="event-item list-group-item" 
      onClick={this.props.setCurrentEvent.bind(null, event)}>
      <h3 className="event-title">{event.title}</h3>
      <span className="event-distance">{event.distance} miles</span>
        {/* Show additional info if clicked */}
        {this.props.currentEvent && event.id === this.props.currentEvent.id
        ? <div id="event-info">
            <h4 id="event_location">{event.location}</h4>
            <p id="event_description">{event.description}</p>
            {this.myFriendsGoing(this.props.currentUser.friendsList,event.guests)}
            <div className="text-center view-details">
              <Link to={`/${event.id}`}>
                <button className="btn btn-secondary">
                  View Event Details
                </button>
              </Link>
            </div>
          </div>
        : null}
    </li>
  }

  myFriendsGoing(friendsList, guestList){ //This function checks which friends of yours are going to the event.  Will show up to 5 pictures.
    if (friendsList) {
      var friendIds = friendsList.map((friendId => friendId.id))
      var friendsGoing = guestList.filter((friendGoing) => friendIds.includes(friendGoing.id));

      return <div>Friends Going: {friendsGoing.length} {friendsGoing.map((friend,index) => {
        if (index<5) {
          return <img className = 'eventListFriendImage' key = {friend.id} src = {friend.image}/>
        }
      })}</div>
    }
  }

  seeInvites() {  //This will filter via invites
    var newList = this.props.list.filter((event) => {
      return this.props.invitations.includes(event.id)
    })
    this.props.filterList(
      newList,
      'invites',
      this.props.currentUser.id,
      this.props.hiddenEvents,
      this.props.location
    )
  }

  render() {
    return (
      <div className="explore container-fluid text-center">
        <div className="row event-map">
        <EventMap />
          <div className="list col-xs-4 text-left">
            <ListFilter />
            {this.props.invitations.length>0 ? <button onClick = {this.seeInvites.bind(this)}>pending invites ({this.props.invitations.length})</button> : null}
            <div className="eventList">
              <ul className="event-list list-group">
                {this.props.listFiltered.map((event, index) =>
                  this.renderListItem(event, index))}
              </ul>
            </div>
            <div className="event-buttons">
              <Link to="/create">
                <button className="create-event btn btn-primary btn-block">
                  Create
                </button>
              </Link>
              <button
                className="logout btn btn-danger btn-block"
                onClick={this.props.userLogOut}>
                Log Out
              </button>
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
    currentUser: state.currentUser,
    list: state.list,
    listFiltered: state.listFiltered,
    hiddenEvents: state.hiddenEvents,
    invites: state.invites,
    invitations: state.invitations,
    location: state.map.currLocation
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    setLocation,
    setCurrentEvent,
    getHiddenEvents,
    getList,
    filterList,
    userLogOut,
    addInvite
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
