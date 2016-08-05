import { GET_HIDDEN_EVENTS, HIDE_EVENT, UNHIDE_EVENT } from '../actions/actions';

export default function(state = [], action) {
  switch (action.type) {
    case GET_HIDDEN_EVENTS: {
      return action.payload.data.map(event => event.event_id);
    }
    case HIDE_EVENT: {
      return [...state, action.payload.data.event_id]; 
    }
    case UNHIDE_EVENT: {
      return state.filter(id => id !== action.payload.data.event_id);
    }
    default: {
      return state;
    }
  }
}
