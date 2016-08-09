import axios from 'axios';

import { CREATE_EVENT, VALIDATE_EVENT_FORM, UPDATE_EVENT_FIELD, CLEAR_FORM_VALUES, UPDATE_TIME } from '../actions/actions';
import { getDefaultState, isTimeWithinRange, isTimeInTheFuture, getEventTime, get24Hour, validateTitle, validateDescription, validateLocation, validateHour, validateMinute, validateAmpm, validateField, validateTimeRange, validateForm  } from '../utils/form';

export default function(state = getDefaultState(), action) {
  switch (action.type) {
    case VALIDATE_EVENT_FORM:
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