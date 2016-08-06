import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createEvent, setCurrentEvent, validateEventForm, updateEventField } from '../actions/actions';

export class EventCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      privacy: "false", 
      group_visibility: "1",
      currentUser: this.props.currentUser.id,
      error_title: "",
      error_description: "",
      error_location: "",
      error_time: true,
      error_duration: true
    }  
  }


  onDurationHourChange(event) {
    this.setState({duration_hour: event.target.value})
  }

  onDurationMinuteChange(event) {
    this.setState({duration_minute: event.target.value})
  }

  onPrivacyChange(event) {
    this.setState({privacy:event.target.value})
  }

  onVisibilityChange(event) {
    this.setState({group_visibility: event.target.value})
  }



  parseTime(callback){
    console.log('4~~~', this.state.hour, " ", this.state.minute, " ", this.state.ampm)
    // if(this.state.ampm === 'pm'){
    //   this.setState({hour: Number(this.state.hour) + 12})
    // }

    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    if(month < 10) { month =  "0" + month}
    if(day < 10) { day = '0' + day}

    const timeString = `${year}-${month}-${day}T${Number(this.state.hour) + ((this.state.ampm === 'pm') ? 12 : 0)}:${this.state.minute}:00.000`;
    // console.log('66666~~', timeString);
    this.setState({time: timeString}, () => {
      // console.log('updated state: ', this.state.time);
      callback();
    });

    // if(this.state.ampm === 'pm'){
    //   this.setState({time: `${year}-${month}-${day}T${Number(this.state.hour) + 12}:${this.state.minute}:00.000`})      
    // } else {
    //   this.setState({time: `${year}-${month}-${day}T${this.state.hour}:${this.state.minute}:00.000`})  
    // }
    // console.log('777777~~',`${year}-${month}-${day}T${Number(this.state.hour) + 12}:${this.state.minute}:00.000`)
    console.log('888888~~~~',this.state.time)
    console.log('9999999~~~~',this.state)
  }

  setCurrentTime() {
    const d = new Date();
    const hour = d.getHours();
    const minute =  d.getMinutes();
    this.setState({hour: hour.toString()});
    this.setState({minute: minute.toString()})
    console.log('hour:', hour, ' minute: ',minute)
    console.log('state: ', this.state)
  }

  validate(event) {
    //console.log('event.title.length:',event.title.length)
    // if (event.title.length === 0) {
    //   this.setState({error_title: 'Title cannot be empty'})
    // } else if (event.title.length > 30 ) {
    //   this.setState({error_title:'Title has to be less than 30 characters'})
    // }

    // if (event.description.length === 0) {
    //   this.setState({error_description: 'Description cannot be empty'})
    // } else if (event.description.length > 30 ) {
    //   this.setState({error_description:'Description has to be less than 30 characters'})
    // }

    // if (event.location.length === 0) {
    //   this.setState({error_location: 'Location cannot be empty'})
    // }
    
  }


  isAllValid(){
    // const items = this.state.isValidMessage;
    // for (let key in items) {
    //   if (items[key].length > 0) return false;
    // }
    // return true;
    if (this.state.error_title === "",
        this.state.error_description === "",
        this.state.error_location === "",
        this.state.error_time === "",
        this.state.error_duration){
      return true;
    }
  }

  onSubmitRedux(event) {
    event.preventDefault();
    console.log('3~~~~',this.props.eventFormData)
    this.props.validateEventForm(this.props.eventFormData);
  }

  onFieldChangeRedux(event) {
    //console.log('field changed');
    this.props.updateEventField(event.target.name, event.target.value);
  }
  // action creator 
  onSubmit(event) {
    const self = this;
    event.preventDefault();
    this.parseTime(() => {
      console.log('6~~~~',this.state.time)
      this.clearAllErrors();
      
      this.isAllValid() ? 
        this.props.createEvent(this.state)
          .then(res => {
            console.log('res.error~~',res.error)
            if (res.error) {
              self.setState({error_location: 'Location invalid'});
              console.log('error!!!',self.state.location)
              throw new Error('Unable to create event');
            }; 
            return this.props.setCurrentEvent(this.props.newEvent);
          })
          .then(() => { browserHistory.push(`/${this.props.newEvent.id}`) })
          .catch(err => {
            // clear form and display error?
            console.log(err);
          }): null;
    });
  }

  //clear value action creator
  onClearValues(event) {
    this.setState({
      title: "", 
      description: "", 
      location: "", 
      time: "",
      hour:"",
      minute:"",
      ampm:"", 
      duration: "", 
      max_guests: "", 
      privacy: "false", 
      group_visibility: "1",
      error_title: "",
      error_description: "",
      error_location: "",
      error_time: true,
      error_duration: true
    })
  }

  clearAllErrors() {
    this.setState({
      error_title: "",
      error_description: "",
      error_location: "",
      error_time: true,
      error_duration: true
    })
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
                  <option value="">  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="col-xs-2">
                <select name="minute" 
                  className="form-control"   
                  value={eventFormData.minute}
                  onBlur={this.onFieldChangeRedux.bind(this)}
                  onChange={this.onFieldChangeRedux.bind(this)}>
                  <option value=""> </option>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
              </div>
              <div className="col-xs-2">
                <select name="ampm"
                  className="form-control"
                  value={eventFormData.ampm}
                  onBlur={this.onFieldChangeRedux.bind(this)}
                  onChange={this.onFieldChangeRedux.bind(this)}>
                  <option value=""></option>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
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
        
              {validationErrors.hour ? <div className="text-danger"> {validationErrors.hour} </div> : null}
              {validationErrors.minute ? <div className="text-danger"> {validationErrors.minute} </div> : null}
              {validationErrors.ampm ? <div className="text-danger"> {validationErrors.ampm} </div> : null}
            </div>

            <div className="form-group row">
              <label className="col-xs-4">Duration</label>
              <div className="col-xs-2">
                <select name="hour"  
                  className="form-control"               
                  value={eventFormData.duration_hour} 
                  onChange={this.onFieldChangeRedux.bind(this)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="col-xs-2">
                <select name="minute" 
                  className="form-control"   
                  value={eventFormData.duration_minute} 
                  onChange={this.onFieldChangeRedux.bind(this)}>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
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
            </div>
          </form>
          {validationErrors._form ? <div className="text-danger"> {validationErrors._form} </div> : null}
      </div>
    )
  }  
}

function mapStateToProps(state) {
  return {
    newEvent: state.eventCreate,
    currentUser: state.currentUser,
    validationErrors: state.eventCreate.validationErrors,
    eventFormData: state.eventCreate.eventFormData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createEvent, setCurrentEvent, validateEventForm, updateEventField}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
