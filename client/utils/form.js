import moment from 'moment';

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
      hour: currHour > 12 ? currHour - 12: currHour === 0 ? 12 : currHour,
      minute: currMinute,
      ampm: currHour >= 12 ? 'pm': 'am',
      duration_hour: 1,
      duration_minute: 0,
      endTime: '',
      duration: 0,
      category:'other',
      privacy: 'false',
      max_guests: -1,
      is_tomorrow: false
    },
    validationErrors: {}
  }
}

export function isTimeWithinRange(hour, minute, ampm, is_tomorrow) {
  const currTime = new Date();
  hour = Number(hour);
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
    return new Date(d.getTime() + ONE_DAY_IN_MILLIS);
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
    return 'Title cannot be empty';
  } else if (title.length > 24) {
    return 'Title should be less than 24 characters';
  } else {
    return '';
  }
}

export function validateDescription(description) {
  if (description.length > 100) {
    return 'Description should be less than 100 characters';
  } else {
    return '';
  }
}

export function validateLocation(location) {
  if (location.length === 0) {
    return 'Location cannot be empty';
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

export function validateCapacity(num) {
  if (Number(num) === 0) {
    return 'Capacity cannot be 0';
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
      return validateMinute(fieldValue);
    case 'ampm':
      return validateAmpm(fieldValue);
    // case 'duration_hour':
    //   return validateDuration(fieldValue,undefined);
    // case 'duration_minute':
    //   return validateDuration(undefined,fieldValue);
    case 'max_guests':
      return validateCapacity(fieldValue);
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

export function validateDuration(validationErrors, formData) {
  if (formData.duration_hour == 0 && formData.duration_minute == 0) {
    validationErrors._duration = 'Duration cannot be 0'
  } else {
    delete validationErrors._duration;
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
  validateDuration(validationErrors, formData);

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

export function parseTime(hour, minute, ampm, is_tomorrow) {
  const d = new Date();
  const year = d.getFullYear();
  const offSet = d.getTimezoneOffset()
  let month = d.getMonth() + 1;
  let day = d.getDate();

  let newHour;
  if(ampm === 'pm') {
    if(hour !== '12') {
      newHour = hour * 1 + 12;
    }
  } else if (ampm === 'am' && hour === '12') {
    newHour = hour - 12;
  } else {
    newHour = hour;
  }

  if(month < 10) { month =  "0" + month}
  if(day < 10) { day = '0' + day}
  const momTime = `${year}-${month}-${day}T${newHour}:${minute}:00${offSet}`

  return moment.utc(momTime, "YYYY-MM-DD HH:mm Z").format()
}

export function parseEndTime(startTime,hour,minute){
  if(hour === 0 && minute === 0){

    const start_time = moment(`${year}-${month}-${day} ${Number(hour) - ((hour == 12) ? 12 : 0) + ((ampm === 'pm') ? 12 : 0)}:${minute}`, 'YYYY-MM-DD HH:mm');
    if(is_tomorrow) { 
      return start_time.add(1,'days');
    } else {
      return start_time;
    }

  }
}

export function parseDuration(hour, minute) {
  hour = Number(hour);
  minute = Number(minute);
  if(!hour && !minute) {
    return 0;
  } else if (!hour) {
    hour = 0
  } else if (!minute) {
    minute = 0;
  }
  return (hour * 60 + minute) * 60;
}
