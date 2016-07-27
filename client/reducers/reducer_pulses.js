import {FETCH_PULSE} from '../actions/actions'


export default function(state=0,action) {
  switch(action.type) {
    case FETCH_PULSE:  
      return action.payload;  
  }
  return state;
}
