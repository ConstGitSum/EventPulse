export const SET_CURR_MARKER = 'SET_CURR_MARKER';
export const SET_PREV_MARKER = 'SET_PREV_MARKER';

export function setCurrMarker(marker) {
  return {
    type: SET_CURR_MARKER,
    payload: marker
  };
}

export function setPrevMarker(marker) {
  return {
    type: SET_PREV_MARKER,
    payload: marker
  };
}
