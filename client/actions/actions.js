import axios from 'axios';

export const FETCH_PULSE = 'FETCH_PULSE';
export const FETCH_LOGSTATE = 'FETCH_LOGSTATE';
export const USER_LOGOUT = 'USER_LOGOUT';


export function fetchPulse(pulseCount){	
  return {	
    type: FETCH_PULSE,
    payload : pulseCount
  }
}

export function fetchLogState(){
  const request = axios.get('/api/auth/loggedIn');

  return {
    type: FETCH_LOGSTATE,
    payload: request
  }
}

export function userLogOut(){
  const request = axios.post('/api/auth/logOut');

  return {
    type: USER_LOGOUT,
    payload: request
  }
}
