import { SET_CURR_MARKER, SET_PREV_MARKER } from '../actions/map';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURR_MARKER: {
      return Object.assign(state, { currMarker: action.payload });
    }
    case SET_PREV_MARKER: {
      return Object.assign(state, { prevMarker: action.payload });
    }
    default: {
      return state;
    }
  }
}
