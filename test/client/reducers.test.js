import { expect } from 'chai';

import reducer from '../../client/reducers';

describe('Reducers', () => {

  it('should handle FETCH_PULSE', () => {
    const initialState = { pulse: 0, logState: false };
    const action = {
      type: 'FETCH_PULSE',
      payload: 1
    }
    const nextState = reducer(initialState, action);
    expect(nextState.pulse).to.equal(1);
    expect(nextState.logState).to.equal(false);
  });

  it('should handle FETCH_LOGSTATE', () => {
    const initialState = { pulse: 0, logState: false };
    const action = {
      type:'FETCH_LOGSTATE',
      payload: { data: true }
    }
    const nextState = reducer(initialState, action);
    expect(nextState.pulse).to.equal(0);
    expect(nextState.logState).to.equal(true);
  });

  it('should handle undefined state', () => {
    const action = {
      type: 'FETCH_LOGSTATE',
      payload: { data: true }
    }
    const nextState = reducer(undefined, action);
    expect(nextState.pulse).to.equal(0);
    expect(nextState.logState).to.equal(true);
  });

})
