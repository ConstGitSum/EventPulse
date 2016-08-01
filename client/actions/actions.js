import axios from 'axios';

export const FETCH_PULSE = 'FETCH_PULSE';
export const FETCH_LOGSTATE = 'FETCH_LOGSTATE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const JOIN_EVENT = 'JOIN_EVENT';
export const HIDE_EVENT = 'HIDE_EVENT';

export function fetchPulse(pulseCount) {	
  return {	
    type: FETCH_PULSE,
    payload : pulseCount
  }
}

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

/**
 * Action to join the current event
 * @param  {Number} eventId Current event's id
 * @param  {Number} userId  Current user's id
 * @return {Object}         Action
 */
export function joinEvent(eventId, userId) {
  const url = `/api/events/${eventId}/join/${userId}`
  const body = {
    userId: userId,
    status: "accepted"
  }
  const request = axios.post(url, body)

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
  const url = `/api/events${eventId}/hide`
  const body = { userId: userId }
  const request = axios.post(url, body)

  return {
    type: HIDE_EVENT,
    payload: request
  }
}