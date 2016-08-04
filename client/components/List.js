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
            <Link to={`/${event.id}`}>
              <button className="view-details btn btn-secondary">
                View Event Details
              </button>
            </Link>
          </div>
        : null}
    </li>
  }

  render() {
    return (
      <div className="explore">
<<<<<<< fcd7a729b25f2db5fc18876af728ff17eac73a3b:client/components/List.js
        <h1>Explore</h1>
          <ListFilter />
=======
        <h1 id="explore">Explore</h1>
          <EventListFilter />
>>>>>>> (feat) added background for EventDetails & EventList:client/components/EventList.js
          <ul className="event-list list-group">
            {this.props.listFiltered.map((event, index) =>
              this.renderListItem(event, index))}
          </ul>

        <Link to="/create">
        <span>
          <button className="create-event pure-button-primary">
            Create
          </button>
         </span> 
        </Link>
        <span>
        <button 
<<<<<<< fcd7a729b25f2db5fc18876af728ff17eac73a3b:client/components/List.js
          className="logout btn btn-danger" 
=======
          className="logout btn-danger" 
>>>>>>> (feat) added background for EventDetails & EventList:client/components/EventList.js
          onClick={this.props.userLogOut}> 
          Log Out
        </button>         
        </span>
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
