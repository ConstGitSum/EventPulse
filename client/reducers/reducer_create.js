import { CREATE_EVENT } from '../actions/actions';

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_EVENT: {
      return action.payload.data;
    }
    default: {
      return state;
    }
  }
}
