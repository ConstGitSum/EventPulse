import configureStore from 'redux-mock-store';
import ReduxPromise from 'redux-promise';
import moxios from 'moxios';
import { expect } from 'chai';

import * as actions from '../../client/actions/actions';

const middlewares = [ReduxPromise];
const mockStore = configureStore(middlewares);

// Test example with mocha and expect
describe('Actions', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch FETCH_LOGSTATE action', (done) => {
    const store = mockStore({});
    moxios.stubRequest('/api/auth/loggedIn', {
      status: 200,
      responseText: true
    });

    // Return the promise
    return store.dispatch(actions.fetchLogState())
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('FETCH_LOGSTATE');
        expect(action.payload.data).to.equal(true);
        done();
      });
  });

  it('should dispatch USER_LOGOUT action', (done) => {
    const store = mockStore({});
    moxios.stubRequest('/api/auth/logOut', {
      status: 200,
      // using 'false' instead of false to actually return responseText
      responseText: 'false'
    });

    return store.dispatch(actions.userLogOut())
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('USER_LOGOUT');
        expect(action.payload.data).to.equal(false);
        done();
      });
  });

  // TODO: Fix timeout issue
  xit('should dispatch JOIN_EVENT action', (done) => {
    const store = mockStore({})
    moxios.stubRequest('/api/events/1/guest', {
      status: 200,
      responseText: { id: 1 }
    });

    return store.dispatch(actions.joinEvent(1, 1))
      .then(() => {
        console.log("hitB?")
        const action = store.getActions()[0];
        expect(action.type).to.equal('JOIN_EVENT');
        expect(action.payload.data).to.deep.equal({ id: 1 });
        done();
      });
  });

  // TODO: Fix timeout issue
  xit('should dispatch HIDE_EVENT action', (done) => {
    const store = mockStore({})
    moxios.stubRequest('/api/events/1/hide', {
      status: 200,
      responseText: {}
    })

    return store.dispatch(actions.hideEvent(1, 1))
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('HIDE_EVENT');
        expect(action.payload.data).to.equal({});
        done()
    });
  })

});
