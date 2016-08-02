import {combineReducers} from 'redux';
import LogStateReducer from './reducer_logState';
import CurrentEventReducer from './reducer_eventDetails';
import EventListReducer from './reducer_eventList';

// So in the regular code, your component created an action which went to actions.js.  That then goes to a specific reducer.  All the reducers are then bundled up here
// and sent to the store.
const rootReducer = combineReducers({
  logState: LogStateReducer,
  currentEvent: CurrentEventReducer,
  eventList: EventListReducer
});

export default rootReducer;
