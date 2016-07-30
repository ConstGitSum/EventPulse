import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {createEvent} from '../actions/actions';

export class Create extends Component {
  // const {fields:{title,location,time,description,privacy,visibility}, handleSubmit} = this.props;
  render() {   
    return (
      <form>
        <h3>Create New Event</h3>
        <div className='form-group'>
          <label>Event Title</label>
          <input type='text' className='form-control'/>
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea className='form-control'/>
        </div>
        <div className='form-group'>
          <label>Location</label>
          <input type='text' className='form-control'/>
        </div>
        <div className='form-group'>
          <label>Date</label>
          <input type='date' className='form-control'/>
        </div>
        <div className='form-group'>
          <label>Start Time</label>
          <input type='time' className='form-control'/>
        </div>
        <div className='form-group'>
          <label>End Time</label>
          <input type='time' className='form-control'/>
        </div>
        <div className='form-group'>
          <label>Number of Guests</label>
          <input type='number' className='form-control'/>
        </div>
        <div className='form-group'>
          <label>Privacy</label>
          <input type='checkbox' className='form-control'/>
        </div>
        <div className='form-group'>
          <label>Visibility</label>
          <input type='checkbox' className='form-control'/>
        </div>
        <button type='submit' className='btn btn-primary'>Create Event</button>
      </form>
    );
  }
}

// export default reduxForm({
//   form: 'CreateEventForm',
//   fields: ['title','location','time','description','privacy','visibility']
// }, null, {createEvent})(Create);