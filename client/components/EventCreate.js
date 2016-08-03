import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEvent, setCurrentEvent } from '../actions/actions';

export class EventCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "", 
      description: "", 
      location: "", 
      time: "", 
      duration: "", 
      max_guests: "", 
      privacy: true, 
      group_visibility: "",
      currentUser: this.props.currentUser.id
    }  
  }

  onKeyPress(event) {
    this.setState({[event.target.name]:event.target.value})
  }

  onPrivacyChange(event) {
    this.setState({privacy:event.target.value})
  }

  onVisibilityChange(event) {
    this.setState({group_visibility: event.target.value})
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.createEvent(this.state)
      .then(resp => {
        return this.props.setCurrentEvent(this.props.newEvent);
      })
      .then(() => {
        console.log(this.props.newEvent)
        browserHistory.push(`/${this.props.newEvent.id}`);
      })
  }

  onClearValues(event) {
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

  render() {
    return(
      <div className="container">
          <h3>Create New Event</h3>
          <form role="form">
            <div className="form-group">       
              <input 
                type="text" 
                name="title" 
                placeholder="Event title" 
                value={this.state.title} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="description" 
                placeholder="Description" 
                value={this.state.description} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="location" 
                placeholder="Location" 
                value={this.state.location} 
                onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input 
                name="time" 
                type="datetime-local" 
                placeholder="Date" 
                value={this.state.time} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input 
                name="duration" 
                type="number" 
                placeholder="Duration" 
                value={this.state.duration} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group">
              <input 
                name="max_guests" 
                type="number" 
                placeholder="Number of max guests" 
                value={this.state.max_guests} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <br/>
            <label>Privacy</label>
            <div>
              <label>
                <input 
                  name="privacy" 
                  type="radio" 
                  value="false" 
                  checked={this.state.privacy === 'false'} 
                  onChange={this.onPrivacyChange.bind(this)}/> 
                public
              </label>
              <br/>
              <label>
                <input 
                  name="privacy" 
                  type="radio" 
                  value="true" 
                  checked={this.state.privacy === 'true'} 
                  onChange={this.onPrivacyChange.bind(this)}/> 
                  private
              </label>
            </div>
            <label>Visibility</label>
            <div>
              <label>
                <input 
                  name="group_visibility" 
                  type="radio" 
                  value="1" 
                  checked={this.state.group_visibility === "1"} 
                  onChange={this.onVisibilityChange.bind(this)}/> 
                  group1
                </label>
            </div>
            <div>
              <button 
                type="submit" 
                className='btn btn-primary' 
                onClick={this.onSubmit.bind(this)}> 
                Submit 
              </button>
              <button 
                type="button" 
                className='btn btn-primary' 
                onClick={this.onClearValues.bind(this)}> 
                Clear Values 
              </button>
            </div>
          </form>
      </div>
    )
  }  
}

function mapStateToProps(state) {
  return {
    newEvent: state.eventCreate,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createEvent, setCurrentEvent}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
