import { GET_EVENTS } from '../actions/actions';

export default function(state = [], action) {
  console.log("ACTION", action.payload)
  switch (action.type) {
    case GET_EVENTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
