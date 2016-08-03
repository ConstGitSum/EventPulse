import {
  HIDE_EVENT
} from '../actions/actions'

export default function(state = [], action) {
  switch (action.type) {
    /**
     * Handles HIDE_EVENT action by changing state to include the current hidden event
     */
    case HIDE_EVENT:
      return [...state, action.payload.data.event_id]
    default:
      return state;
  }
}