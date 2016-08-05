import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_currentUser';

describe('currentUser Reducer', () => {

  it('should handle GET_CURRENT_USER', () => {
    const initialState = { currentUser: false };
    const action = {
      type: 'GET_CURRENT_USER',
      payload: { data: { id: 1 } }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({ id: 1 });
  });

  it('should handle USER_LOGOUT', () => {
    const initialState = { currentUser: true };
    const action = {
      type: 'USER_LOGOUT',
      payload: { data: false }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(false);
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(false);
  });

});
