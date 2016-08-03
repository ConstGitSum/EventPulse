import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userLogOut, fetchEventList, setCurrentEvent } from '../actions/actions';
import EventListFilter from './EventListFilter';

export class EventList extends React.Component {
  componentDidMount() {
    this.props.fetchEventList();
  }

  renderEventListItem(event, index) {
    return <li 
      key={index} 
      className="list-group-item" 
      onClick={this.props.setCurrentEvent.bind(null, event)}>
      <h3>{event.title}</h3>
        {/* Show additional info if clicked */}
        {this.props.currentEvent && event.id === this.props.currentEvent.id
        ? <div className="event-info">
            <h4>{event.location}</h4>
            <p>{event.description}</p>
            <Link to={`/${event.id}`}>
              <button className="btn btn-secondary">
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
        <h1>Explore</h1>
          <EventListFilter />
          <ul className="event-list list-group">
            {this.props.eventList.map((event, index) =>
              this.renderEventListItem(event, index))}
          </ul>

        <Link to="/create">
          <button className="create-event btn btn-primary">
            Create
          </button>
        </Link>

        <button 
          className="btn btn-danger" 
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
    eventList: state.eventList 
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    setCurrentEvent,
    fetchEventList,
    userLogOut
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
