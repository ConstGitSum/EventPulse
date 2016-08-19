import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_modals';

describe('Modals Reducer', () => {

  describe('should handle TOGGLE_CHAT_MODAL', () => {
    it('should handle initial toggle to true', (done) => {
      const initialState = {}
      const action = {
        type: 'TOGGLE_CHAT_MODAL',
      }
      const nextState = reducer(initialState, action);
      expect(nextState).to.have.property('chat')
      expect(nextState.chat).to.equal(true);
      done();
    });

    it('should handle subsequent toggles', (done) => {
      const initialState = { chat: true }
      const action = {
        type: 'TOGGLE_CHAT_MODAL',
      }
      const nextState = reducer(initialState, action);
      expect(nextState).to.have.property('chat')
      expect(nextState.chat).to.equal(false);
      done();
    });
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal({});
  });

});
