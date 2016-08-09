import { GET_INVITATIONS } from '../actions/actions';

export default function(state = [], action) {
  switch (action.type) {
    case GET_INVITATIONS: {
      return [...state,action.payload];
    }
    default: {
      return state;
    }
  }
}
