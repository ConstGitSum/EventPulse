import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEvent } from '../actions/actions';

export class EventCreate extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: "", 
      description: "", 
      location: "", 
      date: "", 
      duration: "", 
      guests: "", 
      privacy: true, 
      visibility: ""
    }  
  }

  onKeyPress(event){
    console.log(event.target,"HEHHEH",event.target.value)
    this.setState({[event.target.name]:event.target.value})
  }

  onSubmit(event){
    event.preventDefault();
    this.props.createEvent(this.props.currentEvent.eventId, this.props.currentUser.userId);
  }

  render(){
    return(
      <div className='container'>
          <h3>Create New Event</h3>
          <form role = 'form'>
            <div className="form-group">       
              <input type = "text" name="title" type="text"  placeholder="Event title" value = {this.state.title} onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input type = "text" name="description" type="text" placeholder="Description" value = {this.state.description} onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input type = "text" name="location" type="text" placeholder="Location" value = {this.state.location} onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input type = "text" name="date" type="datetime-local" placeholder="Date" value = {this.state.date} onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input type = "text" name="duration" type="number" placeholder="Duration" value = {this.state.duration} onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input type = "text" name="guests" type="number" placeholder="Number of guests" value = {this.state.guests} onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <br/>
            <label>Privacy</label>
            <div>
              <label><input name="privacy" component="input" type="radio" value="false"/> public</label>
              <br/>
              <label><input name="privacy" component="input" type="radio" value="true"/> private</label>
            </div>
            <label>Visibility</label>
            <div>
              <label><input name="visibility" component="input" type="radio" value="1"/> group1</label>
            </div>
            <div>
              <button type="submit" className='btn btn-primary' onSubmit = {this.onSubmit.bind(this)}> submit </button>
              <button type="button" className='btn btn-primary' >Clear Values</button>
            </div>
          </form>
      </div>


      )
  }  
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    EventCreate}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
