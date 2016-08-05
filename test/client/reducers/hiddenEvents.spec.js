import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_hiddenEvents';

describe('hiddenEvents Reducer', () => {

  it('should handle GET_HIDDEN_EVENTS', () => {
    const initialState = [];
    const action = {
      type: 'GET_HIDDEN_EVENTS',
      payload: { 
        data: [
          { user_id: 1, event_id: 1 },
          { user_id: 1, event_id: 2 }
        ] 
      }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal([1, 2]);
  });

  it('should handle HIDE_EVENT', () => {
    const initialState = [1];
    const action = {
      type: 'HIDE_EVENT',
      payload: { data: { user_id: 1, event_id: 2 } }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal([1, 2]);
  });

  it('should handle UNHIDE_EVENT', () => {
    const initialState = [1, 2];
    const action = {
      type: 'UNHIDE_EVENT',
      payload: { data: { event_id: 2 } }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal([1]);
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal([]);
  });

});
