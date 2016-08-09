import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createEvent, 
  setCurrentEvent, 
  validateEventForm, 
  updateEventField, 
  clearFormValues, 
  updateTime } from '../actions/actions';

export class Create extends Component {
  componentWillMount() {
    if (!this.props.currentUser) {
      browserHistory.push('/');
    }
  }
  onSubmitRedux(event) {
    event.preventDefault();
    this.setState({locationError: false})
    this.props.validateEventForm(this.props.eventFormData);

    if (Object.keys(this.props.validationErrors).length === 0) {
      this.props.createEvent(this.props.eventFormData, this.props.currentUser)
      .then(res => {
        if (res.error) {throw new Error('Unable to create event');}
        this.props.clearFormValues();
        browserHistory.push(`/${this.props.currentEvent.id}`);
      })
      .catch(err => {
        this.setState({locationError: true})
        console.log(err)
      });
    }
  }

  onFieldChangeRedux(event) {
    this.props.updateEventField(event.target.name, event.target.value);
  }

  onClearValues(event) {
    this.props.clearFormValues();
  }

  render() {
    const { validationErrors, eventFormData } = this.props;

    return(
      <div className="container">
        <br/>
        <h3 className="row">Create New Event</h3>
        <p>* required</p>
        <br/>
        <form role="form">
          <div className="form-group row">  
            <label className="col-xs-4">Title*</label>   
            <input 
              className="col-xs-8"
              type="text" 
              name="title" 
              placeholder="Event title" 
              value={eventFormData.title}
              onBlur={this.onFieldChangeRedux.bind(this)}
              onChange={this.onFieldChangeRedux.bind(this)}/>
              {validationErrors.title ? <div className="text-danger"> {validationErrors.title} </div> : null}
          </div>
          <div className="form-group row">
            <label className="col-xs-4">Description*</label>
            <input 
              className="col-xs-8"
              type="text" 
              name="description" 
              placeholder="Description" 
              value={eventFormData.description}
              onBlur={this.onFieldChangeRedux.bind(this)}
              onChange={this.onFieldChangeRedux.bind(this)}/>
              {validationErrors.description ? <div className="text-danger"> {validationErrors.description} </div> : null}
          </div>
          <div className="form-group row">
            <label className="col-xs-4">Location*</label>
            <input 
              className="col-xs-8"
              type="text" 
              name="location" 
              placeholder="Location" 
              value={eventFormData.location}
              onBlur={this.onFieldChangeRedux.bind(this)}
              onChange={this.onFieldChangeRedux.bind(this)}/>
              {validationErrors.location ? <div className="text-danger"> {validationErrors.location} </div> : null}
          </div>
          <div className="form-group row">
            <label className="col-xs-4">Time*</label>
            <div className="col-xs-2">
              <select name="hour"  
                className="form-control"               
                value={eventFormData.hour}
                onBlur={this.onFieldChangeRedux.bind(this)}
                onChange={this.onFieldChangeRedux.bind(this)}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                  return (
                    <option key={h} value={h}>{h}</option>
                  );
                })}
              </select>
            </div>
            <div className="col-xs-2">
              <select name="minute" 
                className="form-control"   
                value={10 * Math.ceil(eventFormData.minute/10)}
                onBlur={this.onFieldChangeRedux.bind(this)}
                onChange={this.onFieldChangeRedux.bind(this)}>
                {['00', '10', '20', '30', '40', '50'].map((minute) => {
                  return (
                    <option key={minute} value={minute}>{minute}</option>
                  );
                })}
              </select>
            </div>
            <div className="col-xs-2">
              <select name="ampm"
                className="form-control"
                value={eventFormData.ampm}
                onBlur={this.onFieldChangeRedux.bind(this)}
                onChange={this.onFieldChangeRedux.bind(this)}>
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
            <div className="col-xs-2">
              <select name="is_tomorrow"
                className="form-control"
                value={eventFormData.is_tomorrow}
                onBlur={this.onFieldChangeRedux.bind(this)}
                onChange={this.onFieldChangeRedux.bind(this)}>
                <option value="false">today</option>
                <option value="true">tomorrow</option>
              </select>
              {validationErrors._time ? <div className="text-danger"> {validationErrors._time} </div> : null}
            </div>
            <div className="row">
              <div className="col-xs-4"></div>
              <div className="col-xs-2 text-info"> hour </div>
              <div className="col-xs-2 text-info"> minute </div>
            </div>
            {/*<div className="col-xs-8">
              <input 
                type="checkbox" 
                className="" 
                role="button"
                onClick={this.setCurrentTime.bind(this)}/> 
                <span> Event happening now? </span>
             
            </div>*/}
            <div className="row">
              <div className="col-xs-4"></div>
              <div className="col-xs-8"> 
                {validationErrors.hour ? <div className="text-danger"> {validationErrors.hour} </div> : null}
                {validationErrors.minute ? <div className="text-danger"> {validationErrors.minute} </div> : null}
                {validationErrors.ampm ? <div className="text-danger"> {validationErrors.ampm} </div> : null}
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-xs-4">Duration</label>
            <div className="col-xs-2">
              <select name="duration_hour"  
                className="form-control"               
                value={eventFormData.duration_hour}
                onBlur={this.onFieldChangeRedux.bind(this)}
                onChange={this.onFieldChangeRedux.bind(this)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                  return (
                    <option key={h} value={h}>{h}</option>
                  );
                })}
              </select>                
            </div>
            <div className="col-xs-2">
              <select name="duration_minute" 
                className="form-control"   
                value={10 * Math.ceil(eventFormData.duration_minute/10)}
                onBlur={this.onFieldChangeRedux.bind(this)}
                onChange={this.onFieldChangeRedux.bind(this)}>
                {['00', '10', '20', '30', '40', '50'].map((minute) => {
                  return (
                    <option key={minute} value={minute}>{minute}</option>
                  );
                })}
              </select>
            </div>
          </div>


          <div className="form-group row">
            <label className="col-xs-4">Category</label>
            <div className="col-xs-4">
              <select name="category"  
                className="form-control"               
                value={eventFormData.category}
                onBlur={this.onFieldChangeRedux.bind(this)}
                onChange={this.onFieldChangeRedux.bind(this)}>
                {['athletics', 'entertainment', 'nightlife', 'music','dining', 'coffee', 'olympics-special', 'other'].map((h) => {
                  return (
                    <option key={h} value={h}>{h}</option>
                  );
                })}
              </select>                
            </div>
          </div>


          <div className="form-group row">
            <label className="col-xs-4">Guests</label>
            <input 
              className="col-xs-4"
              name="max_guests" 
              type="number" 
              placeholder="Number of guests" 
              value={eventFormData.guests} 
              onChange={this.onFieldChangeRedux.bind(this)}/>
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
                  checked={eventFormData.privacy === 'false'} 
                  onChange={this.onFieldChangeRedux.bind(this)}/> 
                <span> public</span>
              </label>
              <label className="col-xs-2">
                <input 
                  className="form-check-input"
                  name="privacy" 
                  type="radio" 
                  value="true"
                  checked={eventFormData.privacy === 'true'} 
                  onChange={this.onFieldChangeRedux.bind(this)}/> 
                  <span> private</span>
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
                  checked={eventFormData.group_visibility} 
                  onChange={this.onFieldChangeRedux.bind(this)}/> 
                  <span> group1</span>
                </label>
            </div>
          </div>
          <div className="btn-toolbar">
            <button 
              type="submit" 
              className='btn btn-primary' 
              role="button"
              onClick={this.onSubmitRedux.bind(this)}> 
              Submit 
            </button>
            <button 
              type="button" 
              className='btn btn-danger' 
              role="button"
              onClick={this.onClearValues.bind(this)}> 
              Clear Values 
            </button>
            <Link to='/'>
              <button 
                type="button" 
                className='btn btn-danger' 
                role="button"
                onClick={this.onClearValues.bind(this)}> 
                Back
              </button>
            </Link>
          </div>
        </form>
        {validationErrors._form ? <div className="text-danger"> {validationErrors._form} </div> : null}
        {this.state.locationError ? <div className="text-danger"> Form submission failed: invalid location </div> : null }
      </div>
    )
  }  
}

function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
    validationErrors: state.create.validationErrors,
    eventFormData: state.create.eventFormData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createEvent, setCurrentEvent, validateEventForm, updateEventField, clearFormValues, updateTime}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
