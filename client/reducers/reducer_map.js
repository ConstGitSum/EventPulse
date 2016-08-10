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
      const location = {};

      if (action.payload.coords) {
        location.lat = action.payload.coords.latitude;
        location.lng = action.payload.coords.longitude;
      } else {
        location.lat = action.payload.data.lat;
        location.lng = action.payload.data.lon;
      }

      return Object.assign(state, { currLocation: location });
    }
    default: {
      return state;
    }
  }
}
