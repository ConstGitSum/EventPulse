import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEvent, setCurrentEvent } from '../actions/actions';

export class EventCreate extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: "", 
      description: "", 
      location: "", 
      time: "", 
      duration: "", 
      max_guests: "", 
      privacy: true, 
      group_visibility: ""
    }  
  }

  onKeyPress(event){
    //console.log(event.target,"HEHHEH",event.target.value)
    this.setState({[event.target.name]:event.target.value})
  }

  onSubmit(event){
    event.preventDefault();
    console.log('1~~~~',this.state)
    console.log('2~~~~~',this.props.newEvent)
    console.log('3~~~~',this.props.createEvent)
    //this.props.createEvent(this.props.newEvent);
    this.props.createEvent(this.state)
      .then(resp => {
        console.log('the resp is~~~~~' , resp.payload.data);
        return this.props.setCurrentEvent(resp.payload.data);
        //console.log('4~~~~~',this.props.newEvent.data)

      })
      .then(() => {
        console.log("HELLO",this.props.newEvent)
        browserHistory.push(`/${this.props.newEvent.data.id}`);
      })

  }

  onClearValues(event){
    this.setState({
      title: "", 
      description: "", 
      location: "", 
      time: "", 
      duration: "", 
      max_guests: "", 
      privacy: true, 
      group_visibility: ""
    })
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
              <input type = "text" name="time" type="datetime-local" placeholder="Date" value = {this.state.time} onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input type = "text" name="duration" type="number" placeholder="Duration" value = {this.state.duration} onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input type = "text" name="max_guests" type="number" placeholder="Number of max guests" value = {this.state.max_guests} onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <br/>
            <label>Privacy</label>
            <div>
              <label><input name="privacy" type="radio" value="false"/> public</label>
              <br/>
              <label><input name="privacy" type="radio" value="true"/> private</label>
            </div>
            <label>Visibility</label>
            <div>
              <label><input name="group_visibility" type="radio" value="1"/> group1</label>
            </div>
            <div>
              <button type="submit" className='btn btn-primary' onClick = {this.onSubmit.bind(this)}> Submit </button>
              <button type="button" className='btn btn-primary' onClick = {this.onClearValues.bind(this)}> Clear Values </button>
            </div>
          </form>
      </div>


      )
  }  
}

function mapStateToProps(state) {
  return {
    newEvent: state.eventCreate,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createEvent, setCurrentEvent}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
