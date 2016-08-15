import { TOGGLE_CHAT_MODAL } from '../actions/actions';

export default function(state = {}, action) {
  switch (action.type) {
    case TOGGLE_CHAT_MODAL: {
      const newState = Object.assign({}, state);
      newState.chat = !state.chat;
      return newState;
    }
    default: {
      return state;
    }
  }
}
