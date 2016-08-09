import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_map';

describe('Map Reducer', () => {

  it('should handle SET_CURR_MARKER', () => {
    const initialState = {}
    const action = {
      type: 'SET_CURR_MARKER',
      payload: { marker: {}, eventId: 1 }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.have.property('currMarker');
    expect(nextState.currMarker).to.deep.equal({ marker: {}, eventId: 1 });
  });

  it('should handle SET_PREV_MARKER', () => {
    const initialState = {}
    const action = {
      type: 'SET_PREV_MARKER',
      payload: { marker: {}, eventId: 1 }
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.have.property('prevMarker');
    expect(nextState.prevMarker).to.deep.equal({ marker: {}, eventId: 1 });
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal({});
  });

});
