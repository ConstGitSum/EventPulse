import { JOIN_EVENT, HIDE_EVENT } from '../actions/actions';

const seed = {
  title: "TDD Title",
  description: "TDD Description",
  location: "TDD Location",
  time: "TDD Time"
}
/**
 * Reducer to update state based on EventDetails' actions
 * @param  {Object} state  Current store's state
 * @param  {Object} action 
 * @return {Object}        New state
 */
export default function(state = seed, action) {
  let newState;

  switch (action.type) {
    /**
     * Join the current event
     * @type {Object}
     */
    case JOIN_EVENT:
      // action.payload is a promise that resolved with the new user object that was
      // returned after the server API call to join event
      newState = Object.assign({}, state);
      newState.currentEvent.guests = [...newState.currentEvent.guests, action.payload.data];
      return newState
    /**
     * Hide the current event
     * @type {Object}
     */
    case HIDE_EVENT:
      newState = Object.assign({}, state);
      newState.currentEvent = {};
      return newState
    default:
      return state;
  }
}