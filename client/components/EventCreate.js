import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {createEvent} from '../actions/actions';

export class EventCreate extends React.Component {

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
 
    return (
      <form onSubmit={handleSubmit} className='container'>
        <br/>
        <h3>Create New Event</h3>
        <Field name="title" type="text" component={renderField} placeholder="Event title" defaultValue="event title" />
        <Field name="description" type="text" component={renderField} placeholder="Description" defaultValue="event description"/>
        <Field name="location" type="text" component={renderField} placeholder="Location" defaultValue="event location"/>
        <Field name="date" type="datetime-local" component={renderField} placeholder="Date" defaultValue="2016-08-30T08:00"/>
        <Field name="duration" type="number" component={renderField} placeholder="Duration"/>
        <Field name="guests" type="number" component={renderField} placeholder="Number of guests"/>
        <br/>
        <label>Privacy</label>
        <div>
          <label><Field name="privacy" component="input" type="radio" value="false"/> public</label>
          <br/>
          <label><Field name="privacy" component="input" type="radio" value="true"/> private</label>
        </div>
        <label>Visibility</label>
        <div>
          <label><Field name="visibility" component="input" type="radio" value="1"/> group1</label>
          <br/>
          <label><Field name="visibility" component="input" type="radio" value="2"/> group2</label>
        </div>
        <div>
          <button type="submit" className='btn btn-primary' disabled={submitting}>Create Event</button>
          <button type="button" className='btn btn-primary' disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    );
  }

}

const validate = values => {
  const errors = {}
  
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length > 30) {
    errors.title = 'Must be 30 characters or less'
  }
  if (!values.description) {
    errors.description = 'Required'
  } else if (values.description.length > 300) {
    errors.description = 'Must be 300 characters or less'
  }
  if (!values.location) {
    errors.location = 'Required'
  } else if (values.description.length > 100) {
    errors.description = 'Must be 100 characters or less'
  }
  if (!values.date) {
    errors.date = 'Required'
  }
  return errors
}

const renderField = props => (
  <div>
    <label>{props.placeholder}</label>
    <div>
      <input {...props.input}/>
      {props.touched && props.error && <span>{props.error}</span>}
    </div>
  </div>
)

export default reduxForm({
  form: 'createEventForm',  // a unique identifier for this form
  onSubmit: createEvent,
  onSubmitSuccess: () => {console.log('success'); },
  onSubmitFail: () => {throw new SubmissionError({_error: 'Login failed!' })},
  validate  
})(EventCreate)