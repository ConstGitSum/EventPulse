import { GET_EVENTS } from '../actions/actions';

export default function (state = [], action) {
  switch (action.type) {
    case GET_EVENTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
