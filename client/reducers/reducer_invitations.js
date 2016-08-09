import { GET_INVITATIONS, REMOVE_INVITATION, GET_ALL_INVITATIONS } from '../actions/actions';

export default function(state = [], action) {
  switch (action.type) {
    case GET_INVITATIONS: {
      return [...state, action.payload];
    }
    
    case REMOVE_INVITATION: {
      return state.filter(value => value !== action.payload)
    }

    case GET_ALL_INVITATIONS: {
      return action.payload.data
    }
    default: {
      return state;
    }
  }
}
