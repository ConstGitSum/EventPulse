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
    // set currentEvent in store to current list item
    // redirect to eventDetails
    this.props.setCurrentEvent(event);
    browserHistory.push(`/${event.id}`);
  }

  render(){
    return (
      <div className='event-items'>
        <h5>Events Happening!</h5>
          {this.props.eventList.map((event, index) => {
            return ( 
            <ul key={index} className="events">
              <li>{"What's happening? " + event.title}</li>
              <li>{"Where? " + event.location}</li>
              <li>{"What are we goin to do? "+ event.description}</li>
              <li>
                <button onClick={this.viewEventDetails.bind(this, event)}>
                  View Event Details
                </button>
              </li>
            </ul>
            )
          })}
        <button 
          className='create-event'
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
  return { eventList: state.eventList };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    setCurrentEvent,
    fetchEventList,
    userLogOut
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
