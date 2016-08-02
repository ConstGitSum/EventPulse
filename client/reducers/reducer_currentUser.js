import { FETCH_CURRENT_USER } from '../actions/actions';
import { USER_LOGOUT } from '../actions/actions';


export default function(state = false, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:  
      return action.payload.data;  
    case USER_LOGOUT:  
      return action.payload.data;  
  }
  return state;
}
