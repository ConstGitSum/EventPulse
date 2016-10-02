import { FILTER_EVENTS } from '../actions/actions';

export default function (state = [], action) {
  switch (action.type) {
    case FILTER_EVENTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
