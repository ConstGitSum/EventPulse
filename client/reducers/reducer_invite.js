import { GET_INVITES } from '../actions/actions';

export default function (state = [], action) {
  switch (action.type) {
    case GET_INVITES: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
