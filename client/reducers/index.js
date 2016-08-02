import {combineReducers} from 'redux';
import CurrentUserReducer from './reducer_currentUser';
import CurrentEventReducer from './reducer_eventDetails';
import EventListReducer from './reducer_eventList';
import EventCreateReducer from './reducer_eventCreate';

// So in the regular code, your component created an action which went to actions.js.  That then goes to a specific reducer.  All the reducers are then bundled up here
// and sent to the store.
const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  currentEvent: CurrentEventReducer,
  eventList: EventListReducer,
  eventCreate: EventCreateReducer
});

export default rootReducer;
