import configureStore from 'redux-mock-store';
import ReduxPromise from 'redux-promise';
import { expect } from 'chai';

import * as actions from '../../../client/actions/map';

const mockStore = configureStore([]);

describe('Map Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch SET_CURR_MARKER action', (done) => {
    store.dispatch(actions.setCurrMarker({ marker: {}, eventId: 1 }));
    const action = store.getActions()[0];
    expect(action.type).to.equal('SET_CURR_MARKER');
    expect(action.payload).to.be.a('object');
    expect(action.payload).to.have.property('marker');
    expect(action.payload).to.have.property('eventId');
    expect(action.payload.eventId).to.be.a('number');
    done();
  });

  it('should dispatch SET_PREV_MARKER action', (done) => {
    store.dispatch(actions.setPrevMarker({ marker: {}, eventId: 1 }));
    const action = store.getActions()[0];
    expect(action.type).to.equal('SET_PREV_MARKER');
    expect(action.payload).to.be.a('object');
    expect(action.payload).to.have.property('marker');
    expect(action.payload).to.have.property('eventId');
    expect(action.payload.eventId).to.be.a('number');
    done();
  });

});
