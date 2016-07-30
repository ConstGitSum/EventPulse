import { JOIN_EVENT } from '../actions/actions'

export default function(state = {}, action) {
  switch (action.type) {
    case JOIN_EVENT:
      // action.payload is a promise that resolved with the new user object that was
      // returned after the server API call to join event
      const newState = Object.assign({}, state)
      newState.guest = [...newState.guest, action.payload.data]
      
      return newState
  }
}