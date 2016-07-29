import {FETCH_LOGSTATE} from '../actions/actions'


export default function(state = false, action) {
  switch(action.type) {
    case FETCH_LOGSTATE:  
      return action.payload;  
  }
  return state;
}
