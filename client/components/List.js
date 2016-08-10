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
import ListFilter from './ListFilter';
import EventMap from './EventMap';

export class List extends React.Component {
  componentDidMount() {
    this.props.setCurrentEvent({});
    this.props.getHiddenEvents(this.props.currentUser.id)
    .then(() => this.props.getList())
    .then(() => this.props.filterList(
      this.props.list,
      'unhidden',
      this.props.currentUser.id,
      this.props.hiddenEvents
    ));
  }

  renderListItem(event, index) {
    return <li 
      key={index} 
      className="event-item list-group-item" 
      onClick={this.props.setCurrentEvent.bind(null, event)}>
      <h3>{event.title}</h3>
        {/* Show additional info if clicked */}
        {this.props.currentEvent && event.id === this.props.currentEvent.id
        ? <div id="event-info">
            <h4 id="event_location">{event.location}</h4>
            <p id="event_description">{event.description}</p>
            {this.myFriendsGoing(this.props.currentUser.friendsList,event.guests)}
            <Link to={`/${event.id}`}>
              <button className="view-details btn btn-secondary">
                View Event Details
              </button>
            </Link>
          </div>
        : null}
    </li>
  }
  myFriendsGoing(friendsList, guestList){ //This function checks which friends of yours are going to the event.  Will show up to 5 pictures.
    if(friendsList){
    var friendIds = friendsList.map((friendId => friendId.id))
    var friendsGoing = guestList.filter((friendGoing) => {
      if(friendIds.includes(friendGoing.id)){
        return true
      }   
      return false
    })
    return <div>Friends Going: {friendsGoing.length} {friendsGoing.map((friend,index) => {
      if(index<5){
      return <img className = 'eventListFriendImage' key = {friend.id} src = {friend.image}/>
      }
    }
    )}</div>
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
      this.props.hiddenEvents
    )
  }

  render() {
    return (
      <div className="explore container-fluid text-center">
        <EventMap />
        <div className="col-sm-4 text-left">
          <h1 id="explore">Explore</h1>
          <ListFilter />
          
          <ul className="event-list list-group">
            {this.props.listFiltered.map((event, index) =>
              this.renderListItem(event, index))}
          </ul>
          <Link to="/create">
            <button className="create-event btn btn-primary">
              Create
            </button>
          </Link>
          <button 
            className="logout btn btn-danger" 
            onClick={this.props.userLogOut}> 
            Log Out
          </button>         
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
    invitations: state.invitations
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    setCurrentEvent,
    getHiddenEvents,
    getList,
    filterList,
    userLogOut,
    addInvite
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
