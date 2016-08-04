import { FETCH_EVENTS, FILTER_EVENTS } from '../actions/actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return action.payload;
    case FILTER_EVENTS:
      return action.payload;
    default:
      return state;
  }
}
