import axios from 'axios';
import { CREATE_EVENT, VALIDATE_EVENT_FORM, UPDATE_EVENT_FIELD, CLEAR_FORM_VALUES, UPDATE_TIME } from '../actions/actions';

function getDefaultState() {
  const d = new Date();
  let currHour = d.getHours();
  let currMinute = d.getMinutes();
  console.log('currHOUr', currHour)
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
      privacy: false,
      group_visibility: 1,
      max_guests: 0
    },
    validationErrors: {}
  }
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
	//console.log('hour~~~', hour, 'type:', typeof(hour))
  if (hour === '') {
  	//console.log('no empty')
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

function validateForm(validationErrors, formData) {
  for (let fieldKey in formData) {
    const errorMessage = validateField(fieldKey, formData[fieldKey]);
    if (errorMessage) {
      validationErrors[fieldKey] = errorMessage;
    }
  }
  // console.log('3~~~',validationErrors)
  // console.log('4~~~',Object.keys(validationErrors).length)
  if(Object.keys(formData).length === 0 && formData.constructor === Object) {
    validationErrors._form = 'Form cannot be empty'
  } else if (Object.keys(validationErrors).length > 0) {
    validationErrors._form = 'Please fill out all the required fields';
    //console.log('Object.keys(validationErrors).length~~~',Object.keys(validationErrors).length)
    if (Object.keys(validationErrors).length === 1) {
      validationErrors = {};
      // validationErrors._form = '';
    }
  }
  
  return validationErrors;
}

function parseTime(hour, minute, ampm){
  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  if(month < 10) { month =  "0" + month}
  if(day < 10) { day = '0' + day}
  return `${year}-${month}-${day}T${Number(hour) + ((ampm === 'pm') ? 12 : 0)}:${minute}:00.000`;
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

function createEvent(formData, currentUser, callback) {
  //console.log('in CREATE EVENT~~~', formData,currentUser, callback)
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
 
  switch (action.type) {

    case CREATE_EVENT:
      if (Object.keys(state.validationErrors).length > 0) {
        return Object.assign({}, state);
      }
      createEvent(state.eventFormData, action.payload, function(resp) {
        //console.log('in creating event, resp is ~~~~~',resp);
        return Object.assign({}, state);
      });

    case VALIDATE_EVENT_FORM:
      //console.log('submitting form', state);
      validateForm(Object.assign({}, state.validationErrors), state.eventFormData);
      return Object.assign({}, state, {
        eventFormData: Object.assign({}, state.eventFormData, action.payload.formData),
        validationErrors: validateForm(Object.assign({}, state.validationErrors), state.eventFormData)
    });
    
    case UPDATE_EVENT_FIELD:      
      const validationErrors = Object.assign({}, state.validationErrors);

      const fieldError = validateField(action.payload.fieldKey, action.payload.fieldValue);
      
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