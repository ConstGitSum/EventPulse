import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_invitations';

describe('Invitations Reducer', () => {

  describe('should handle GET_INVITATIONS', () => {
    it('should handle new invitation', () => {
      const initialState = [1, 2];
      const action = {
        type: 'GET_INVITATIONS',
        payload: 3
      }
      const nextState = reducer(initialState, action);
      expect(nextState).to.deep.equal([1, 2, 3]);
    });

    it('should handle exisiting invitation', () => {
      const initialState = [1, 2];
      const action = {
        type: 'GET_INVITATIONS',
        payload: 2
      }
      const nextState = reducer(initialState, action);
      expect(nextState).to.deep.equal([1, 2]);
    });
  });

  it('should handle GET_ALL_INVITATIONS', () => {
    const initialState = [];
    const action = {
      type: 'GET_ALL_INVITATIONS',
      payload: [1, 2, 3]
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal([1, 2, 3]);
  });

  it('should handle REMOVE_INVITATION', () => {
    const initialState = [1, 2, 3];
    const action = {
      type: 'REMOVE_INVITATION',
      payload: 3
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal([1, 2]);
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal([]);
  });

});
