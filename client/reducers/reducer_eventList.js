import { FETCH_EVENTS_ALL } from '../actions/actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_EVENTS_ALL:
      return action.payload;
    default:
      return state;
  }
}
