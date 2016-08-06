import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  userLogOut, 
  getList, 
  setCurrentEvent, 
  getHiddenEvents,
  filterList 
} from '../actions/actions';
import ListFilter from './ListFilter';

export class List extends React.Component {
  componentDidMount() {
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
    console.log('event',event.guests)
    return <li 
      key={index} 
      className="event-item list-group-item" 
      onClick={this.props.setCurrentEvent.bind(null, event)}>
      <h3>{event.title}</h3>
        {/* Show additional info if clicked */}
        {this.props.currentEvent && event.id === this.props.currentEvent.id
        ? <div className="event-info">
            <h4>{event.location}</h4>
            <p>{event.description}</p>
            {this.friendsGoing(this.props.currentUser.friendsList,event.guests)} PICTURES
            <Link to={`/${event.id}`}>
              <button className="view-details btn btn-secondary">
                View Event Details
              </button>
            </Link>
          </div>
        : null}
    </li>
  }
  friendsGoing(friendsList, guestList){
    var friendIds = friendsList.map((friendId => friendId.id))
    var friendsGoing = guestList.filter((friendGoing) => {
      if(friendIds.includes(friendGoing.id))
        return true
      return false
    })
    return <div>Friends Going: {friendsGoing.length} {friendsGoing.map((friend) => {
      return <img className = 'eventListFriendImage'key = {friend.id} src = {friend.image}/>
    }
    )}</div>
  }

  render() {
    return (
      <div className="explore">
        <h1>Explore</h1>
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
    )
  }
}

function mapStateToProps(state) {
  return { 
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
    list: state.list,
    listFiltered: state.listFiltered,
    hiddenEvents: state.hiddenEvents
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    setCurrentEvent,
    getHiddenEvents,
    getList,
    filterList,
    userLogOut
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
