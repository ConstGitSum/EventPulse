import axios from 'axios';

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_EVENTS_ALL = 'FETCH_EVENTS_ALL';
export const FETCH_EVENTS_UNHIDDEN = 'FETCH_EVENTS_UNHIDDEN';
export const FETCH_EVENTS_HIDDEN = 'FETCH_EVENTS_HIDDEN';
export const FETCH_EVENTS_CREATED = 'FETCH_EVENTS_CREATED';
export const FETCH_EVENTS_JOINED = 'FETCH_EVENTS_JOINED';
export const FETCH_EVENTS_PENDING = 'FETCH_EVENTS_PENDING';
export const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT';
export const USER_LOGOUT = 'USER_LOGOUT';
export const JOIN_EVENT = 'JOIN_EVENT';
export const HIDE_EVENT = 'HIDE_EVENT';
export const LEAVE_EVENT = 'LEAVE_EVENT';
export const CREATE_EVENT = 'CREATE_EVENT';

export function fetchCurrentUser() {
  const request = axios.get('/api/auth/loggedIn')

  return {
    type: FETCH_CURRENT_USER,
    payload: request
  }
}

export function userLogOut() {
  const request = axios.post('/api/auth/logOut');

  return {
    type: USER_LOGOUT,
    payload: request
  }
}

export function fetchEventList(filter) {
  const request = axios.get('/api/events')
    .then(events => 
      Promise.all(events.data.map(event => 
        axios.get(`/api/events/${event.id}/guests`)
          .then(guests => Object.assign(event, { guests: guests.data }))
      ))
    );

  return {
    type: FETCH_EVENTS_ALL,
    payload: request
  }
}

export function setCurrentEvent(event) {
  return {
    type: SET_CURRENT_EVENT,
    payload: event
  }
}

export function joinEvent(eventId, userId) {
  const url = `/api/events/${eventId}/guests`;
  const body = {
    user_id: userId,
    status: "accepted"
  };
  const request = axios.post(url, body);

  return {
    type: JOIN_EVENT,
    payload: request
  }
}

export function hideEvent(eventId, userId) {
  const url = `/api/events/${eventId}/hide`;
  const body = { user_id: userId };
  const request = axios.post(url, body);

  return {
    type: HIDE_EVENT,
    payload: request
  }
}

export function leaveEvent(eventId, userId) {
  const url = `/api/events/${eventId}/guests/${userId}`;
  const request = axios.delete(url);

  return {
    type: LEAVE_EVENT,
    payload: request
  }
}

export function createEvent(newEvent){
  const request = axios.post('/api/events', {
    title: newEvent.title,
    description: newEvent.description,
    created_by: 1,
    location: newEvent.location,
    time: newEvent.time,
    duration: newEvent.duration || 999999999,
    max_guests: newEvent.max_guests || 999999999,
    privacy: newEvent.privacy || false,
    group_visibility: newEvent.group_visibility || null
  });

  return{
    type: CREATE_EVENT,
    payload: request
  }
}
