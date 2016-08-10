import { SET_CURR_MARKER, SET_PREV_MARKER, SET_LOCATION } from '../actions/map';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURR_MARKER: {
      return Object.assign(state, { currMarker: action.payload });
    }
    case SET_PREV_MARKER: {
      return Object.assign(state, { prevMarker: action.payload });
    }
    case SET_LOCATION: {
      console.log(action.payload)
      return Object.assign(state, { currLocation: action.payload });
    }
    default: {
      return state;
    }
  }
}
