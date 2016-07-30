import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {createEvent} from '../actions/actions';

export class Create extends Component {
  // const {handleSubmit} = this.props;
  // const handleSubmit = this.props.handleSubmit;
  // redux form is injecting helpers into this.props, so we can get to the helpers by saying this.props (this.props.handleSubmit, this.props.fields)
  // map inputs to fields, 
  //const {fields:{title,description,location,startTime,endTime,guests,privacy,visibility}, handleSubmit} = this.props;
  
  // const title = this.props.fields.title
  // {...title} destructuring ==> formProps = {title}
  // when handleSubmit is called, an object with key title,value title input will go to props of createEvent
  render() {   
    const {fields:{title,description,location,startTime,endTime,guests,privacy,visibility}, handleSubmit} = this.props;
    //console.log(title);
    return (
      <form onSubmit={handleSubmit(this.props.createEvent)}>
        <h3>Create New Event</h3>
        <div className='form-group'>
          <label>Event Title</label>
          <input ref='input' type='text' className='form-control' {...title}/>
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea className='form-control' {...description}/>
        </div>
        <div className='form-group'>
          <label>Location</label>
          <input type='text' className='form-control' {...location}/>
        </div>
        <div className='form-group'>
          <label>Date</label>
          <input type='date' className='form-control' {...date}/>
        </div>
        <div className='form-group'>
          <label>Start Time</label>
          <input type='time' className='form-control' {...startTime}/>
        </div>
        <div className='form-group'>
          <label>End Time</label>
          <input type='time' className='form-control' {...endTime}/>
        </div>
        <div className='form-group'>
          <label>Number of Guests</label>
          <input type='number' className='form-control' {...number}/>
        </div>
        <div className='form-group'>
          <label>Privacy</label>
          <input type='checkbox' className='form-control' {...privacy}/>
        </div>
        <div className='form-group'>
          <label>Visibility</label>
          <input type='checkbox' className='form-control' {...visibility}/>
        </div>
        <button type='submit' className='btn btn-primary'>Create Event</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'CreateEventForm',
  fields: ['title','description','location','startTime','endTime','guests','privacy','visibility']
}, null, {createEvent})(Create);

