import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {createEvent} from '../actions/actions';

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length > 15) {
    errors.title = 'Must be 15 characters or less'
  }
  if (!values.description) {
    errors.description = 'Required'
  } else if (values.description.length > 205) {
    errors.description = 'Must be 205 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
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

const Create = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Event</h3>
      <Field name="title" type="text" component={renderField} placeholder="Event title"/>
      <Field name="description" type="text" component={renderField} placeholder="Description"/>
      <Field name="location" type="text" component={renderField} placeholder="Location"/>
      <Field name="date" type="date" component={renderField} placeholder="Date"/>
      <Field name="time" type="time" component={renderField} placeholder="Time"/>
      <Field name="duration" type="time" component={renderField} placeholder="Duration"/>
      <Field name="guests" type="number" component={renderField} placeholder="Number of guests"/>
      <label>Privacy</label>
        <Field name="privacy" type="checkbox" component={renderField}/>
      <label>Visibility</label>
      <Field name="visibility" type="checkbox" component={renderField}/>
      <div>
        <button type="submit" className='btn btn-primary' disabled={submitting}>Create Event</button>
        <button type="button" className='btn btn-primary' disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'createEventForm',  // a unique identifier for this form
  onSubmit: createEvent,
  validate  
})(Create)