import axios from 'axios';

export const SET_CURR_MARKER = 'SET_CURR_MARKER';
export const SET_PREV_MARKER = 'SET_PREV_MARKER';
export const SET_LOCATION = 'SET_LOCATION';

export function setCurrMarker(marker) {
  return {
    type: SET_CURR_MARKER,
    payload: marker,
  };
}

export function setPrevMarker(marker) {
  return {
    type: SET_PREV_MARKER,
    payload: marker,
  };
}

export function setLocation() {
  const request = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (resp) => { resolve(resp); },
      () => { reject(axios('http://ip-api.com/json')); }
    );
  });

  return {
    type: SET_LOCATION,
    payload: request,
  };
}
