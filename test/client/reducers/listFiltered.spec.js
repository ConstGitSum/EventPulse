import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_listFiltered';

describe('listFiltered Reducer', () => {

  it('should handle FILTER_EVENTS', () => {
    const initialState = [];
    const action = {
      type: 'FILTER_EVENTS',
      payload: [{ id : 1 }, { id : 2 }]
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal([{ id : 1 }, { id : 2 }]);
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal([]);
  });

});
