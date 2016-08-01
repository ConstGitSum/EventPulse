import { expect } from 'chai';

import reducer from '../../client/reducers';

describe.only('Reducers', () => {

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

  it('should handle USER_LOGOUT', () => {
    const initialState = { pulse: 0, logState: true };
    const action = {
      type:'USER_LOGOUT',
      payload: { data: false }
    }
    const nextState = reducer(initialState, action);
    expect(nextState.pulse).to.equal(0);
    expect(nextState.logState).to.equal(false);
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

  it('should handles JOIN_EVENT', () => {
    const initialState = { guests: [{ id: 1}] }
    const action = {
      type: 'JOIN_EVENT',
      payload: {
        data: {
          id: 1
        }
      }
    }
    const nextState = reducer(initialState, action)

    expect(nextState.currentEvent.guests[0]).to.deep.equal({id: 1})
  })

  it('should handle HIDE_EVENT', () => {
    const initialState = {}
    const action = {
      type: 'HIDE_EVENT',
      payload: {}
    }
    const nextState = reducer(initialState, action)

    expect(nextState.currentEvent).to.deep.equal({})
  })

})
