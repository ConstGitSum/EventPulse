import { CREATE_EVENT, VALIDATE_EVENT_FORM, UPDATE_EVENT_FIELD, CLEAR_FORM_VALUES } from '../actions/actions';

const defaultState = {
  eventFormData: {},
  validationErrors: {}
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
	console.log('hour~~~', hour, 'type:', typeof(hour))
  if (hour === '') {
  	console.log('no empty')
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

function validateForm(formData) {
  const validationErrors = {};
  //console.log('is formData === {}...', formData === {})
 
  for (let fieldKey in formData) {
  	
    const errorMessage = validateField(fieldKey, formData[fieldKey]);
    if (errorMessage) {
      validationErrors[fieldKey] = errorMessage;
    }
  }

   if(Object.keys(formData).length === 0 && formData.constructor === Object) {
  	validationErrors._form = 'Form cannot be empty'
  	}
  //form has error :else if val is not emp... validationerrors not emp
  //check if not 
  console.log('222~~~~validationErrors', validationErrors)
  return validationErrors;
}

export default function(state = defaultState, action) {
 
  switch (action.type) {
    case CREATE_EVENT:
      return Object.assign({ guests:[] }, action.payload.data);
    case VALIDATE_EVENT_FORM:
      console.log('submitting form', state);
      //return Object.assign({}, state);
      return Object.assign({}, state, {
        eventFormData: action.payload.formData,
        validationErrors: validateForm(action.payload.formData)
    });
		
    case UPDATE_EVENT_FIELD:
      //console.log('updating form~~~~', state);
      return Object.assign({}, state, {
        eventFormData: { [action.payload.fieldKey]: action.payload.fieldValue },
        validationErrors: Object.assign({}, state.validationErrors,{ [action.payload.fieldKey]: validateField(action.payload.fieldKey, action.payload.fieldValue) })
      });

     case CLEAR_FORM_VALUES:
     console.log('3~~', action.payload)
     	return Object.assign({},{
     	  eventFormData: {},
     	  validationErrors: {}
     	});

    default:
      return state;
  }
}
