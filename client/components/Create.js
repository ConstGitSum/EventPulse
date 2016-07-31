import React, {Component,PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createEvent} from '../actions/actions';

export const fields=['title','description','location','date','startTime','endTime','guests','privacy','visibility'];

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
    const {
      fields:{title,description,location,date,startTime,endTime,guests,privacy,visibility},
        handleSubmit,
        submitting
      } = this.props;

    return (
      <form onSubmit={this.props.handleSubmit}>
        <h3>Create New Event</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger': null}`}>
          <label>Event Title</label>
          <input type='text' placeholder='Movie night' className='form-control' {...title.input}/>
          <div className='text-help'>
            {/*title.touched ? title.error: ''*/}
          </div>
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea placeholder='Some description...' className='form-control' {...description.input}/>
        </div>
        <div className='form-group'>
          <label>Location</label>
          <input type='text' placeholder='701 Brazos Street, Austin, TX' className='form-control' {...location.input}/>
        </div>
        <div className='form-group'>
          <label>Date</label>
          <input type='date' className='form-control' {...date.input}/>
        </div>
        <div className='form-group'>
          <label>Start Time</label>
          <input type='time' className='form-control' {...startTime.input}/>
        </div>
        <div className='form-group'>
          <label>End Time</label>
          <input type='time' className='form-control' {...endTime.input}/>
        </div>
        <div className='form-group'>
          <label>Number of Guests</label>
          <input type='number' className='form-control' {...guests.input}/>
        </div>
        <div className='form-group'>
          <label>Privacy</label>
          <input type='checkbox' className='form-control' {...privacy.input}/>
        </div>
        <div className='form-group'>
          <label>Visibility</label>
          <input type='checkbox' className='form-control' {...visibility.input}/>
        </div>
        <button type='submit' disabled={submitting} className='btn btn-primary'> {submitting ? <i/> : <i/>} Create Event</button>
      </form>
    );
  }
}

function validate(values){
  const errors={};
  if(!values.title){
    errors.title='Enter an event title';
  }
  if(!values.description){
    errors.title='Enter an event description';
  }
  return errors;
}

Create.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'CreateEventForm',
  fields,
  validate
}, null, {onSubmit: createEvent})(Create);

