import { FETCH_LOGSTATE } from '../actions/actions';
import { USER_LOGOUT } from '../actions/actions';


export default function(state = false, action) {
  switch(action.type) {
    case FETCH_LOGSTATE:  
      console.log(action.payload)
      return action.payload.data;  
    case USER_LOGOUT:  
      return action.payload.data;  
  }
  return state;
}
