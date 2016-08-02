import {combineReducers} from 'redux';
import PulseReducer from './reducer_pulses';
import LogStateReducer from './reducer_logState';
import CurrentEventReducer from './reducer_eventDetails';
import { reducer as formReducer } from 'redux-form';

// So in the regular code, your component created an action which went to actions.js.  That then goes to a specific reducer.  All the reducers are then bundled up here
// and sent to the store.
const rootReducer = combineReducers({
  pulse: PulseReducer,
  logState: LogStateReducer,
  currentEvent: CurrentEventReducer,
  form: formReducer
});

export default rootReducer;
