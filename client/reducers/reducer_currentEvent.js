import { 
  JOIN_EVENT, 
  HIDE_EVENT, 
  SET_CURRENT_EVENT, 
  LEAVE_EVENT
} from '../actions/actions';

/**
 * Reducer to update state based on EventDetails' actions
 * @param  {Object} state  Current store's state
 * @param  {Object} action 
 * @return {Object}        New state
 */
export default function(state = {}, action) {
  let newState;

  switch (action.type) {
    case LEAVE_EVENT: {
      newState = Object.assign({}, state)
      newState.guests = newState.guests
        .filter((guest) => guest.id !== action.payload.data.id);

      return newState;
    }
    case SET_CURRENT_EVENT: {
      return action.payload;
    }
    /**
     * Join the current event
     * @type {Object}
     */
    case JOIN_EVENT: {
      // action.payload is a promise that resolved with the new user object that was
      // returned after the server API call to join event
      newState = Object.assign({}, state);
      newState.guests = [...newState.guests, action.payload.data];
      return newState;
    }
    default: {
      return state;
    }
  }
}
