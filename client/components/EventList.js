import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userLogOut, fetchEventList, setCurrentEvent } from '../actions/actions';

export class EventList extends React.Component {
  componentDidMount() {
   this.props.fetchEventList();
  }
  
  handleCreate() {
  }

  viewEventDetails(event) {
    // redirect to eventDetails
    browserHistory.push(`/${event.id}`);
  }

  render() {
    return (
      <div className="explore">
        <h1>Explore</h1>
          <ul className="event-list list-group">
          {this.props.eventList.map((event, index) => {
            return ( 
              <li 
                key={index} 
                className="list-group-item" 
                onClick={this.props.setCurrentEvent.bind(null, event)}>
                <h3>{event.title}</h3>
                  {this.props.currentEvent && event.id === this.props.currentEvent.id
                  ? <div className="event-info">
                      <h4>{event.location}</h4>
                      <p>{event.description}</p>
                      <button 
                        className="btn btn-secondary"
                        onClick={this.viewEventDetails.bind(this, event)}>
                        View Event Details
                      </button>
                    </div>
                  : null}
              </li>
            )
          })}
          </ul>
        <button 
          className="create-event btn btn-primary"
          onClick={this.handleCreate.bind(this)}>
          Create
        </button>
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
