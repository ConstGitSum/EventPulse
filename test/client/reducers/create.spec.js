import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_create';

describe('create Reducer', () => {

  it('should handle CREATE_EVENT', () => {
    const initialState = {};
    const action = {
      type: 'CREATE_EVENT',
      payload: { data: { id: 1, guests: [] } }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({ id: 1, guests: [] });
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal({});
  });

});
