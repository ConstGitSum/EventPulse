import { JOIN_EVENT, HIDE_EVENT } from '../actions/actions';

/**
 * Reducer to update state based on EventDetails' actions
 * @param  {Object} state  Current store's state
 * @param  {Object} action 
 * @return {Object}        New state
 */
export default function(state = {}, action) {
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
      newState.guests = [...newState.guests, action.payload.data];
      return newState;
    /**
     * Hide the current event
     * @type {Object}
     */
    case HIDE_EVENT:
      return {};
    default:
      return state;
  }
}
