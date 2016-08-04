import { HIDE_EVENT } from '../actions/actions';

export default function(state = [], action) {
  switch (action.type) {
    case HIDE_EVENT:
      return [...state, action.payload.data.event_id]; 
    default: 
  }
}