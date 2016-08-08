import axios from 'axios';
import { CREATE_EVENT, VALIDATE_EVENT_FORM, UPDATE_EVENT_FIELD, CLEAR_FORM_VALUES, UPDATE_TIME } from '../actions/actions';

const EVENT_RANGE_LIMIT_IN_MILLIS = 12 * 60 * 60 * 1000;
const ONE_DAY_IN_MILLIS = 24 * 60 * 60 * 1000;

function getDefaultState() {
  const today = new Date();
  let currHour = today.getHours();
  let currMinute = today.getMinutes();
  //console.log('currHOUr', today,  currHour)
  return {
    eventFormData: {
      title: '',
      description: '',
      location: '',
      hour: currHour > 12? currHour - 12: currHour,
      minute: currMinute,
      ampm: currHour > 12? 'pm': 'am',
      duration_hour: 0,
      duration_minute: 0,
      privacy: 'false',
      group_visibility: 1,
      max_guests: 0,
      is_tomorrow: false
    },
    validationErrors: {}
  }
}

function parseTime(hour, minute, ampm){
  const d = new Date();
  const year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  
  if(month < 10) { month =  "0" + month}
  if(day < 10) { day = '0' + day}

  return `${year}-${month}-${day}T${Number(hour) + ((ampm === 'pm') ? 12 : 0)}:${minute}:00.000`;
}

function isTimeWithinRange(hour, minute, ampm, is_tomorrow) {
  const currTime = new Date();
  const eventTime = getEventTime(hour, minute, ampm, is_tomorrow);
  //console.log('isTimeWithinRange', currTime, eventTime);
  return (eventTime.getTime() - currTime.getTime()) <= EVENT_RANGE_LIMIT_IN_MILLIS; 
}

function isTimeInTheFuture(hour, minute, ampm, is_tomorrow) {
  const currTime = new Date();
  const eventTime = getEventTime(hour, minute, ampm, is_tomorrow);
  //console.log('isTimeInTheFuture', currTime.getTime() < eventTime.getTime());
  return eventTime.getTime() > currTime.getTime();
}

function getEventTime(hour, minute, ampm, is_tomorrow) {
  const d = new Date();
  d.setHours(get24Hour(hour, ampm));
  //console.log('minute', minute);
  d.setMinutes(minute);
  //console.log('is_tomorrow', typeof is_tomorrow, is_tomorrow);
  if (is_tomorrow) {
    return new Date(d.getTime() + ONE_DAY_IN_MILLIS);
  }
  return d;
}

function get24Hour(hour, ampm) {
  if (ampm === 'pm') {
    return hour + 12;
  } else {
    return hour;
  }
}

function parseDuration(hour, minute){
  if(!hour && !minute) {
    return 9999999;
  } else if (!hour) {
    hour = 0
  } else if (!minute) {
    minute = 0;
  }
  return (hour * 60 + minute) * 60;
}

function validateTitle(title) {
  if (title.length === 0) {
    return 'title cannot be empty';
  } else if (title.length > 10) {
    return 'title should be less than 10 characters (for now)';
  } else {
    return '';
  }
}

function validateDescription(description) {
  if (description.length === 0) {
    return 'description cannot be empty';
  } else if (description.length > 10) {
    return 'description should be less than 10 characters (for now)';
  } else {
    return '';
  }
}

function validateLocation(location) {
  if (location.length === 0) {
    return 'location cannot be empty';
  } else {
    return '';
  }
}

function validateHour(hour) {
  if (hour === '') {
    return 'Hour cannot be empty';
  } else {
    return '';
  }
}

function validateMinute(minute) {
  if (minute === '') {
    return 'Minute cannot be empty';
  } else {
    return '';
  }
}

function validateAmpm(ampm) {
  if (ampm === '') {
    return 'AM/PM cannot be empty';
  } else {
    return '';
  }
}

function validateField(fieldKey, fieldValue) {
  switch (fieldKey) {
    case 'title':
      return validateTitle(fieldValue);
    case 'description':
      return validateDescription(fieldValue);
    case 'location':
      return validateLocation(fieldValue);
    case 'hour':
      return validateHour(fieldValue);
    case 'minute':
      return validateMinute(fieldValue);
    case 'ampm':
      return validateAmpm(fieldValue);
    default:
      return '';
  }
}

function validateTimeRange(validationErrors, formData) {
  //console.log('isfuture', isTimeInTheFuture(formData.hour, formData.minute, formData.ampm, formData.is_tomorrow));
  if (!isTimeInTheFuture(formData.hour, formData.minute, formData.ampm, formData.is_tomorrow)) {
    //console.log('future');
    validationErrors._time = 'The event has to be in the future'
  } else if (!isTimeWithinRange(formData.hour, formData.minute, formData.ampm, formData.is_tomorrow)) {
    //console.log('out of range');
    validationErrors._time = 'The event has to be in less than 12 hours';
  } else {
    delete validationErrors._time;
  }
}

function validateForm(validationErrors, formData) {
  for (let fieldKey in formData) {
    const errorMessage = validateField(fieldKey, formData[fieldKey]);
    if (errorMessage) {
      validationErrors[fieldKey] = errorMessage;
    }
  }

  //validateTimeRange(validationErrors, formData);

  if(Object.keys(formData).length === 0 && formData.constructor === Object) {
    validationErrors._form = 'Form cannot be empty'
  } else if (Object.keys(validationErrors).length > 0) {
    validationErrors._form = 'Please fill out all the required fields';
      if (Object.keys(validationErrors).length === 1) {
        validationErrors = {};
      }
  } 
  return validationErrors;
}

function createEvent(formData, currentUser, callback) {
  console.log('formData:',formData,' currentUser:', currentUser, ' callback: ', callback);

  const request = axios.post('/api/events', {
    title: formData.title,
    description: formData.description,
    created_by: currentUser.id,
    location: formData.location,
    time: parseTime(formData.hour, formData.minute, formData.ampm),
    duration: parseDuration(formData.duration_hour,formData.duration_minute),
    max_guests: formData.max_guests || 999999999,
    privacy: formData.privacy || false,
    group_visibility: formData.group_visibility || null
  })
  .then(function(resp) {
    callback(resp);
  });
}

export default function(state = getDefaultState(), action) {
  //console.log('in reducer: the action is: ', action )
  console.log('in reducer: the action type is: ', action.type )
  switch (action.type) {

    case CREATE_EVENT:
    console.log('in case create_event now~~~' )
      if (Object.keys(state.validationErrors).length > 0) {
        return Object.assign({}, state);
      }
      //change 
      createEvent(state.eventFormData, action.payload, function(resp) {
        return Object.assign({}, state);
      });

    case VALIDATE_EVENT_FORM:
      validateForm(Object.assign({}, state.validationErrors), state.eventFormData);
      return Object.assign({}, state, {
        eventFormData: Object.assign({}, state.eventFormData, action.payload.formData),
        validationErrors: validateForm(Object.assign({}, state.validationErrors), state.eventFormData)
      });
    
    case UPDATE_EVENT_FIELD:      
      const validationErrors = Object.assign({}, state.validationErrors);
      const fieldError = validateField(action.payload.fieldKey, action.payload.fieldValue); 
      //console.log('validationErrors ',validationErrors, ' fieldError ',fieldError)     
      // if (['is_tomorrow', 'hour', 'minute', 'ampm'].includes(action.payload.fieldKey)) {
      //   validateTimeRange(validationErrors, state.eventFormData);
      // }
      if (fieldError.length !== 0) {
        validationErrors[action.payload.fieldKey] = fieldError;
      } else {
        delete validationErrors[action.payload.fieldKey]; 
      }
      return Object.assign({}, state, {
        eventFormData: Object.assign({}, state.eventFormData, { [action.payload.fieldKey]: action.payload.fieldValue }),
        validationErrors
      });

    case CLEAR_FORM_VALUES:
      return Object.assign({}, getDefaultState());

    case UPDATE_TIME:
      return Object.assign({}, getDefaultState());

    default:
      return state;
  }
}