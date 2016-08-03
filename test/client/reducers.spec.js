import { expect } from 'chai';

import reducer from '../../client/reducers';

describe('Reducers', () => {

  it('should handle FETCH_PULSE', () => {
    const initialState = { currentUser: false };
    const action = {
      type: 'FETCH_PULSE',
      payload: 1
    }
    const nextState = reducer(initialState, action);
    expect(nextState.currentUser).to.equal(false);
  });

  it('should handle FETCH_CURRENTUSER', () => {
    const initialState = { currentUser: false };
    const action = {
      type:'FETCH_CURRENT_USER',
      payload: { data: true }
    }
    const nextState = reducer(initialState, action);
    expect(nextState.currentUser).to.equal(true);
  });

  it('should handle USER_LOGOUT', () => {
    const initialState = { currentUser: true };
    const action = {
      type:'USER_LOGOUT',
      payload: { data: false }
    }
    const nextState = reducer(initialState, action);
    expect(nextState.currentUser).to.equal(false);
  });

  it('should handle undefined state', () => {
    const action = {
      type: 'FETCH_CURRENT_USER',
      payload: { data: true }
    }
    const nextState = reducer(undefined, action);
    expect(nextState.currentUser).to.equal(true);
  });

  it('should handles JOIN_EVENT', () => {
    const initialState = { currentEvent: {
      id: 1, guests: [{ user_id: 1, event_id: 1}] }
    };
    const action = {
      type: 'JOIN_EVENT',
      payload: { data: { user_id: 2, event_id: 1 } }
    }
    const nextState = reducer(initialState, action);

    expect(nextState.currentEvent.guests[1]).to.deep.equal({ user_id: 2, event_id: 1 })
  })

  xit('should handle HIDE_EVENT', () => {
    const initialState = { currentEvent: {
      id: 1, guests: [{ user_id: 1, event_id: 1}] }
    };
    const action = {
      type: 'HIDE_EVENT',
      payload: { status: 'deleted' }
    }
    const nextState = reducer(initialState, action)

    expect(nextState.currentEvent).to.deep.equal({})
  })

})
