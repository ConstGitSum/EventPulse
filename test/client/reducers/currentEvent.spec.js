import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_currentEvent';

describe('currentEvent Reducer', () => {

  it('should handle CREATE_EVENT', () => {
    const initialState = {};
    const action = {
      type: 'CREATE_EVENT',
      payload: { data: { id: 1, guests: [] } }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({ id: 1, guests: [] });
  });

  it('should handle JOIN_EVENT', () => {
    const initialState = { id: 1, guests: [{ user_id: 1, event_id: 1}] };
    const action = {
      type: 'JOIN_EVENT',
      payload: { data: { user_id: 2, event_id: 1 } }
    };
    const nextState = reducer(initialState, action);
    expect(nextState.guests).to.have.length(2);
    expect(nextState.guests[1]).to.deep.equal({ user_id: 2, event_id: 1 })
  })

  it('should handle LEAVE_EVENT', () => {
    const initialState = { id: 1, guests: [{ user_id: 1, event_id: 1}] };
    const action = {
      type: 'LEAVE_EVENT',
      payload: { data: { user_id: 1, event_id: 1 } }
    };
    const nextState = reducer(initialState, action);
    expect(nextState.guests).to.have.length(0);
  })

  it('should handle SET_CURRENT_EVENT', () => {
    const initialState = {};
    const action = {
      type: 'SET_CURRENT_EVENT',
      payload: { id: 1, guests: [] }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({ id: 1, guests: [] });
  })

  it('should handle UPDATE_EVENT', () => {
    const initialState = { id: 1, title: 'test1', guests: [] };
    const action = {
      type: 'UPDATE_EVENT',
      payload: { data: { id: 1, title: 'test2', guests: [] } }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({ id: 1, title: 'test2', guests: [] });
  })

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal({});
  });

});
