import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { create, setCurrentEvent } from '../actions/actions';

export class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "", 
      description: "", 
      location: "", 
      time: "", 
      duration: "", 
      max_guests: "", 
      privacy: "false", 
      group_visibility: "1",
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

  validate(event) {

  }

  onSubmit(event) {
    event.preventDefault();
    this.props.create(this.state)
      .then(res => {
        if (res.error) throw new Error('Unable to create event');
        return this.props.setCurrentEvent(this.props.newEvent);
      })
      .then(() => { browserHistory.push(`/${this.props.newEvent.id}`) })
      .catch(err => {
        // clear form and display error?
        console.log(err)
      });
  }

  onClearValues(event) {
    this.setState({
      title: "", 
      description: "", 
      location: "", 
      time: "", 
      duration: "", 
      max_guests: "", 
      privacy: "false", 
      group_visibility: "1"
    })
  }

  render() {
    return(
      <div className="container">
          <br/>
          <h3 className="row">Create New Event</h3>
          <br/>
          <form role="form">
            <div className="form-group row">  
              <label className="col-xs-4">Title</label>     
              <input 
                className="col-xs-8"
                type="text" 
                name="title" 
                placeholder="Event title" 
                value={this.state.title} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Description</label>
              <input 
                className="col-xs-8"
                type="text" 
                name="description" 
                placeholder="Description" 
                value={this.state.description} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Location</label>
              <input 
                className="col-xs-8"
                type="text" 
                name="location" 
                placeholder="Location" 
                value={this.state.location} 
                onChange = {this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Time</label>
              <input 
                className="col-xs-8"
                name="time" 
                type="datetime-local" 
                placeholder="Date" 
                value={this.state.time} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group row">
              <label className="col-xs-4 ">Duration</label>
              <input 
                className="col-xs-8"
                name="duration" 
                type="number" 
                placeholder="Duration" 
                value={this.state.duration} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Guests</label>
              <input 
                className="col-xs-8"
                name="max_guests" 
                type="number" 
                placeholder="Max number of guests" 
                value={this.state.max_guests} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <br/>
            <div className="form-group row">
              <label className="col-xs-4">Privacy</label>
              <div>
                <label className="col-xs-2">
                  <input 
                    className="form-check-input"
                    name="privacy" 
                    type="radio" 
                    value="false" 
                    checked={this.state.privacy === "false"} 
                    onChange={this.onPrivacyChange.bind(this)}/> 
                  <span>public</span>
                </label>
                <label className="col-xs-2">
                  <input 
                    className="form-check-input"
                    name="privacy" 
                    type="radio" 
                    value="true" 
                    checked={this.state.privacy === "true"} 
                    onChange={this.onPrivacyChange.bind(this)}/> 
                    <span>private</span>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Visibility</label>
              <div>
                <label className="col-xs-2">
                  <input 
                    className="form-check-input"
                    name="group_visibility" 
                    type="radio" 
                    value="1" 
                    checked={this.state.group_visibility === "1"} 
                    onChange={this.onVisibilityChange.bind(this)}/> 
                    <span>group1</span>
                  </label>
              </div>
            </div>
            <div className="btn-toolbar">
              <button 
                type="submit" 
                className='btn btn-primary' 
                role="button"
                onClick={this.onSubmit.bind(this)}> 
                Submit 
              </button>
              <button 
                type="button" 
                className='btn btn-danger' 
                role="button"
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
    newEvent: state.create,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    create, 
    setCurrentEvent
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
