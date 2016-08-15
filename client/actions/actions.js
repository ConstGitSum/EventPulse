import axios from 'axios';

import { parseTime, parseDuration } from '../utils/form';
import { filterByDistance } from '../utils/list';

export const GET_CURRENT_USER    = 'GET_CURRENT_USER';
export const GET_EVENTS          = 'GET_EVENTS';
export const FILTER_EVENTS       = 'FILTER_EVENTS';
export const SET_CURRENT_EVENT   = 'SET_CURRENT_EVENT';
export const USER_LOGOUT         = 'USER_LOGOUT';
export const JOIN_EVENT          = 'JOIN_EVENT';
export const HIDE_EVENT          = 'HIDE_EVENT';
export const UNHIDE_EVENT        = 'UNHIDE_EVENT';
export const LEAVE_EVENT         = 'LEAVE_EVENT';
export const GET_HIDDEN_EVENTS   = 'GET_HIDDEN_EVENTS';
export const CREATE_EVENT        = 'CREATE_EVENT';
export const EDIT_EVENT          = 'EDIT_EVENT';
export const UPDATE_EVENT        = 'UPDATE_EVENT';
export const VALIDATE_EVENT_FORM = 'VALIDATE_EVENT_FORM';
export const UPDATE_EVENT_FIELD  = 'UPDATE_EVENT_FIELD';
export const CLEAR_FORM_VALUES   = 'CLEAR_FORM_VALUES';
export const UPDATE_TIME         = 'UPDATE_TIME';
export const GET_ALL_INVITATIONS = 'GET_ALL_INVITATIONS';
export const GET_INVITES         = 'GET_INVITES';
export const GET_INVITATIONS     = 'GET_INVITATIONS';
export const REMOVE_INVITATION   = 'REMOVE_INVITATION';
export const TOGGLE_CHAT_MODAL  = 'TOGGLE_CHAT_MODAL'; 

export function getCurrentUser() {
  const request = axios.get('/api/auth/loggedIn')

  return {
    type: GET_CURRENT_USER,
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

export function getList() {
  const request = axios.get('/api/events')
    .then(events => 
      Promise.all(events.data.map(event => 
        axios.get(`/api/events/${event.id}/guests`)
          .then(guests => Object.assign(event, { guests: guests.data }))
      ))
    );

  return {
    type: GET_EVENTS,
    payload: request
  }
}

export function filterList(eventList, filter, userId, hiddenEvents, location) {
  const filteredList = 
    filter === 'unhidden' ?
      eventList.filter(e => !hiddenEvents.includes(e.id)) :
    filter === 'hidden' ?
      eventList.filter(e => hiddenEvents.includes(e.id)) :
    filter === 'created' ?
      eventList.filter(e => e.created_by === userId) :
    filter === 'joined' ?
      eventList.filter(e => e.guests.some(guest => 
        guest.id === userId && guest.status === 'accepted')) :
    filter === 'pending' ?
      eventList.filter(e => e.guests.some(guest => 
        guest.id === userId && guest.status === 'pending')) :
      filter === 'invites' ?
      eventList :
    eventList;

  const payload = filterByDistance(filteredList, location);

  return {
    type: FILTER_EVENTS,
    payload: payload
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

export function unhideEvent(eventId, userId) {
  const url = `/api/events/${eventId}/hide/${userId}`
  const request = axios.delete(url)

  return {
    type: UNHIDE_EVENT,
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


export function getHiddenEvents(user_id) {
  const request = axios.get(`/api/events/hide/${user_id}`)

  return {
    type: GET_HIDDEN_EVENTS,
    payload: request
  }
}

export function updateTime() {
  return {
    type: UPDATE_TIME,
  }
}

export function createEvent(formData, currentUser) {
  const request = axios.post('/api/events', {
    title: formData.title,
    description: formData.description,
    created_by: currentUser.id,
    location: formData.location,
    time: parseTime(formData.hour, formData.minute, formData.ampm),
    duration: parseDuration(formData.duration_hour,formData.duration_minute),
    category: formData.category || 'other',
    max_guests: formData.max_guests || null,
    privacy: formData.privacy || false,
    group_visibility: formData.group_visibility || null
  })
  return {
    type: CREATE_EVENT,
    payload: request
  }
}

export function editEvent(currentEvent) {
  return {
    type: EDIT_EVENT,
    payload: currentEvent
  }
}

export function updateEvent(updatedEvent, currentUser, eventId) {
  const url = `/api/events/${eventId}`;
  const body = {
    title            : updatedEvent.title,
    description      : updatedEvent.description,
    created_by       : currentUser.id,
    location         : updatedEvent.location,
    category         : updatedEvent.category,
    time             : parseTime(updatedEvent.hour, updatedEvent.minute, updatedEvent.ampm),
    duration         : parseDuration(updatedEvent.duration_hour,updatedEvent.duration_minute),
    max_guests       : updatedEvent.max_guests,
    privacy          : updatedEvent.privacy,
    group_visibility : updatedEvent.group_visibility
  }
  const request = axios.put(url, body);

  return {
    type: UPDATE_EVENT,
    payload: request
  }
}

export function validateEventForm(formData, callback) {

  return {
    type: VALIDATE_EVENT_FORM,
    payload: { formData, callback }
  }
}

export function addInvite(inviteInfo) {

  return{
    type: GET_INVITES,
    payload: inviteInfo
  }
}

export function getInvitations(invites) {

  return {
    type: GET_INVITATIONS,
    payload: invites
}
}

export function removeInvitation(invite) {
  return {
    type: REMOVE_INVITATION,
    payload: invite
  }
}

export function getAllInvitations(invites) {
 
  return {
    type: GET_ALL_INVITATIONS,
    payload: invites
  }
}

export function updateEventField(fieldKey, fieldValue) {
 
  return {
    type: UPDATE_EVENT_FIELD,
    payload: { fieldKey, fieldValue }
  }
}

export function clearFormValues() {
  
  return {
    type: CLEAR_FORM_VALUES
  }
}

export function toggleChatModal() {
  return {
   type: TOGGLE_CHAT_MODAL
  }
}
