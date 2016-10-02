import { combineReducers } from 'redux';
import CurrentUserReducer from './reducer_currentUser';
import CurrentEventReducer from './reducer_currentEvent';
import ListReducer from './reducer_list';
import ListFilteredReducer from './reducer_listFiltered';
import CreateReducer from './reducer_create';
import HiddenEventsReducer from './reducer_hiddenEvents';
import InviteReducer from './reducer_invite';
import InvitationReducer from './reducer_invitations';
import MapReducer from './reducer_map';
import ModalReducer from './reducer_modals';

// bundle up reducers and send to store.
const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  currentEvent: CurrentEventReducer,
  list: ListReducer,
  listFiltered: ListFilteredReducer,
  create: CreateReducer,
  hiddenEvents: HiddenEventsReducer,
  invites: InviteReducer,
  invitations: InvitationReducer,
  map: MapReducer,
  modals: ModalReducer,
});

export default rootReducer;
