import { JOIN_EVENT } from '../actions/actions'

export default function(state = {}, action) {
  switch (action.type) {
    case JOIN_EVENT:
      // action.payload is a promise that resolved with the new user object that was
      // returned after the server API call to join event
      const newState = Object.assign({}, state)
      newState.currentEvent.guests = [...newState.currentEvent.guests, action.payload.data]

      return newState
  }
}