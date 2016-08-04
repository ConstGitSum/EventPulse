import { GET_HIDDEN_EVENTS, HIDE_EVENT } from '../actions/actions';

export default function(state = [], action) {
  switch (action.type) {
    case GET_HIDDEN_EVENTS: {
      let hiddenEvents = []
      action.payload.data.forEach((event) => hiddenEvents.push(event.event_id))

      return hiddenEvents
    }
    case HIDE_EVENT: {
      return [...state, action.payload.data.event_id]; 
    }
    default: {
      return state;
    }
  }
}