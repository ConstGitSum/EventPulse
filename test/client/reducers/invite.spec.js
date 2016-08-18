import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_invite';

describe('Invite Reducer', () => {

  it('should handle GET_INVITES', () => {
    const initialState = [];
    const action = {
      type: 'GET_INVITES',
      payload: ["test"]
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal(["test"]);
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal([]);
  });

});
