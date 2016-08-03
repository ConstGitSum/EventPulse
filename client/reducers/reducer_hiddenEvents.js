import {
  HIDE_EVENT
} from '../actions/actions'

export default function(state = [], action) {
  switch (action.type) {
    /**
     * Handles HIDE_EVENT action by changing state to include the current hidden event
     */
    case HIDE_EVENT:
      let newState = state
      newState.hiddenEvents = [...newState.hiddenEvents, action.payload.data.event_id]
      
    default:
      return state;
  }
}