import configureStore from 'redux-mock-store';
import ReduxPromise from 'redux-promise';
import moxios from 'moxios';
import { expect } from 'chai';

import * as actions from '../../../client/actions/actions';

const middlewares = [ReduxPromise];
const mockStore = configureStore(middlewares);

// Test example with mocha and expect
describe('hiddenEvents Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch GET_HIDDEN_EVENTS action', (done) => {
    moxios.stubRequest('/api/events/hide/1', {
      status: 200,
      responseText: [ { user_id: 1, event_id: 2 } ]
    })

    return store.dispatch(actions.getHiddenEvents(1))
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('GET_HIDDEN_EVENTS');
        expect(action.payload.data).to.be.a('array');
        expect(action.payload.data[0]).to.have.property('user_id');
        expect(action.payload.data[0]).to.have.property('event_id');
        done()
    });
  });

  it('should dispatch HIDE_EVENT action', (done) => {
    moxios.stubRequest('/api/events/1/hide', {
      status: 200,
      responseText: { user_id: 1, event_id: 1 }
    })

    return store.dispatch(actions.hideEvent(1, 1))
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('HIDE_EVENT');
        expect(action.payload.data).to.have.property('user_id');
        expect(action.payload.data).to.have.property('event_id');
        done()
    });
  });

});
