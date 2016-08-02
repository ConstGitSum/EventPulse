import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { userLogOut } from '../actions/actions';

export class EventList extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      events: [],
      txt: ''
    }
  }

  componentDidMount(){
    axios.get('/api/events').then((eventData) => {
      console.log('~~eventData~~~', eventData.data);
      this.setState({events: eventData.data})
      })
  }
  
  handleCreate(){
    this.setState({txt: '~~~Need a router~~~'});
  }

  render(){
    return (
      <div className='event-items'>
        <h5>Events Happening!</h5>
          {this.state.events.map((event, index) => {
            return ( 
            <ul key={index} className="events">
              <li>{"What's happening? " + event.title}</li>
              <li>{"Where? " + event.location}</li>
              <li>{"What are we goin to do? "+ event.description}</li>
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
        <span>{this.state.txt}</span>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    userLogOut
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(EventList);
