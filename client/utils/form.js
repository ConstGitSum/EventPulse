import moment from 'moment'

const EVENT_RANGE_LIMIT_IN_MILLIS = 12 * 60 * 60 * 1000;
const ONE_DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
const TEN_MINUTE = 10 * 60 * 1000;

export function getDefaultState() {
  const today = new Date();
  const todayInTens = new Date(TEN_MINUTE * Math.ceil(today.getTime()/TEN_MINUTE));
  let currHour = todayInTens.getHours();
  let currMinute = todayInTens.getMinutes(); 
  return {
    eventFormData: {
      title: '',
      description: '',
      location: '',
      hour: currHour > 12 ? currHour - 12: currHour,
      minute: currMinute,
      ampm: currHour > 12 ? 'pm': 'am',
      duration_hour: 0,
      duration_minute: 0,
      category:'other',
      privacy: 'false',
      group_visibility: 1,
      max_guests: 0,
      is_tomorrow: false
    },
    validationErrors: {}
  }
}

export function isTimeWithinRange(hour, minute, ampm, is_tomorrow) {
  const currTime = new Date();
  const eventTime = getEventTime(hour, minute, ampm, is_tomorrow);
  return (eventTime.getTime() - currTime.getTime()) <= EVENT_RANGE_LIMIT_IN_MILLIS; 
}

export function isTimeInTheFuture(hour, minute, ampm, is_tomorrow) {
  const currTime = new Date();
  const eventTime = getEventTime(hour, minute, ampm, is_tomorrow);
  return eventTime.getTime() > currTime.getTime();
}

export function getEventTime(hour, minute, ampm, is_tomorrow) {
  const d = new Date();
  d.setHours(get24Hour(hour, ampm));
  d.setMinutes(minute);
  if (is_tomorrow === 'true') {
    if(ampm === 'pm') {
      return new Date(d.getTime() + ONE_DAY_IN_MILLIS);
    } else if(ampm === 'am' && hour !== '12'){
       return new Date(d.getTime() + ONE_DAY_IN_MILLIS);
    }   
  }
  return d;
}

export function get24Hour(hour, ampm) {
  hour = Number(hour);
  if (hour == 12) {
    hour -= 12;
  }
  if (ampm === 'pm') {
    return hour + 12;
  } else {
    return hour;
  }
}

export function validateTitle(title) {
  if (title.length === 0) {
    return 'title cannot be empty';
  } else if (title.length > 10) {
    return 'title should be less than 10 characters (for now)';
  } else {
    return '';
  }
}

export function validateDescription(description) {
  if (description.length === 0) {
    return 'description cannot be empty';
  } else if (description.length > 10) {
    return 'description should be less than 10 characters (for now)';
  } else {
    return '';
  }
}

export function validateLocation(location) {
  if (location.length === 0) {
    return 'location cannot be empty';
  } else {
    return '';
  }
}

export function validateHour(hour) {
  if (hour === '') {
    return 'Hour cannot be empty';
  } else {
    return '';
  }
}

export function validateMinute(minute) {
  if (minute === '') {
    return 'Minute cannot be empty';
  } else {
    return '';
  }
}

export function validateAmpm(ampm) {
  if (ampm === '') {
    return 'AM/PM cannot be empty';
  } else {
    return '';
  }
}

export function validateField(fieldKey, fieldValue) {
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
    console.log('7~~~minute is:', fieldValue)
      return validateMinute(fieldValue);
    case 'ampm':
      return validateAmpm(fieldValue);
    default:
      return '';
  }
}

export function validateTimeRange(validationErrors, formData) { 
  if (!isTimeInTheFuture(formData.hour, formData.minute, formData.ampm, formData.is_tomorrow)) {
    validationErrors._time = 'The event has to be in the future'
  } else if (!isTimeWithinRange(formData.hour, formData.minute, formData.ampm, formData.is_tomorrow)) {
    validationErrors._time = 'The event has to be in less than 12 hours';
  } else {
    delete validationErrors._time;
  }
}

export function validateForm(validationErrors, formData) {
  for (let fieldKey in formData) {
    const errorMessage = validateField(fieldKey, formData[fieldKey]);
    if (errorMessage) {
      validationErrors[fieldKey] = errorMessage;
    }
  }
  validateTimeRange(validationErrors, formData);
  if(Object.keys(formData).length === 0 && formData.constructor === Object) {
    validationErrors._form = 'Form cannot be empty'
  } else if (Object.keys(validationErrors).length > 0) {
    validationErrors._form = 'Please fix errors and submit again';
      if (Object.keys(validationErrors).length === 1) {
        validationErrors = {};
      }
  } 
  return validationErrors;
}

export function parseTime(hour, minute, ampm) {
  const d = new Date();
  const year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  
  if(month < 10) { month =  "0" + month}
  if(day < 10) { day = '0' + day}
  var currentTime = moment().toDate();
  return `${year}-${month}-${day}T${Number(hour) - ((hour == 12) ? 12 : 0) + ((ampm === 'pm') ? 12 : 0)}:${minute}:00.000`;
}

export function parseDuration(hour, minute) {
  if(!hour && !minute) {
    return 9999999;
  } else if (!hour) {
    hour = 0
  } else if (!minute) {
    minute = 0;
  }
  return (hour * 60 + minute) * 60;
}