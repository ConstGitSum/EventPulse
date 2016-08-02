import axios from 'axios';

export const FETCH_LOGSTATE = 'FETCH_LOGSTATE';
export const FETCH_EVENTS_ALL = 'FETCH_EVENTS_ALL';
export const FETCH_EVENTS_UNHIDDEN = 'FETCH_EVENTS_UNHIDDEN';
export const FETCH_EVENTS_HIDDEN = 'FETCH_EVENTS_HIDDEN';
export const FETCH_EVENTS_CREATED = 'FETCH_EVENTS_CREATED';
export const FETCH_EVENTS_JOINED = 'FETCH_EVENTS_JOINED';
export const FETCH_EVENTS_PENDING = 'FETCH_EVENTS_PENDING';
export const USER_LOGOUT = 'USER_LOGOUT';
export const JOIN_EVENT = 'JOIN_EVENT';
export const HIDE_EVENT = 'HIDE_EVENT';

export function fetchLogState() {
  const request = axios.get('/api/auth/loggedIn');

  return {
    type: FETCH_LOGSTATE,
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
  const request = axios.get('/api/events');

  return {
    type: FETCH_EVENTS_ALL,
    payload: request
  }
}

/**
 * Action to join the current event
 * @param  {Number} eventId Current event's id
 * @param  {Number} userId  Current user's id
 * @return {Object}         Action
 */
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

/**
 * Action to hide the current event
 * @param  {Number} eventId Current event's id
 * @param  {Number} userId  Current user's id
 * @return {Object}        Action
 */
export function hideEvent(eventId, userId) {
  const url = `/api/events/${eventId}/hide`;
  const body = { user_id: userId };
  const request = axios.post(url, body);

  return {
    type: HIDE_EVENT,
    payload: request
  }
}
