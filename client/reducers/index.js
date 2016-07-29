import {combineReducers} from 'redux';
import PulseReducer from './reducer_pulses';
import LogStateReducer from './reducer_logState';
<<<<<<< af8f6e7faf9dfc7aefa17233171ea3ab8957fe70
import CurrentEventReducer from './reducer_eventDetails';
||||||| merged common ancestors
=======
import {reducer as formReducer} from 'redux-form';
>>>>>>> (feat) Add create events form component

// So in the regular code, your component created an action which went to actions.js.  That then goes to a specific reducer.  All the reducers are then bundled up here
// and sent to the store.
const rootReducer = combineReducers({
  pulse: PulseReducer,
<<<<<<< af8f6e7faf9dfc7aefa17233171ea3ab8957fe70
  logState: LogStateReducer,
  currentEvent: CurrentEventReducer,
||||||| merged common ancestors
  logState: LogStateReducer
=======
  logState: LogStateReducer,
  form: formReducer
>>>>>>> (feat) Add create events form component
});

export default rootReducer;