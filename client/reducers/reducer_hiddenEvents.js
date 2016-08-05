import { GET_HIDDEN_EVENTS, HIDE_EVENT, UNHIDE_EVENT } from '../actions/actions';

export default function(state = [], action) {
  console.log("state: ", state)
  switch (action.type) {
    case GET_HIDDEN_EVENTS: {
      let hiddenEvents = []
      action.payload.data.forEach((event) => hiddenEvents.push(event.event_id))

      return hiddenEvents
    }
    case HIDE_EVENT: {
      return [...state, action.payload.data.event_id]; 
    }
    case UNHIDE_EVENT: {
      return state.filter((event_id) => {
        event_id === action.eventId});
    }
    default: {
      return state;
    }
  }
}