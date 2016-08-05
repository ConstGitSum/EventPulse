import configureStore from 'redux-mock-store';
import ReduxPromise from 'redux-promise';
import moxios from 'moxios';
import { expect } from 'chai';

import * as actions from '../../../client/actions/actions';

const middlewares = [ReduxPromise];
const mockStore = configureStore(middlewares);

// Test example with mocha and expect
describe('currentUser Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch GET_CURRENT_USER action', (done) => {
    moxios.stubRequest('/api/auth/loggedIn', {
      status: 200,
      responseText: { id: 3 }
    });

    // Return the promise
    return store.dispatch(actions.getCurrentUser())
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('GET_CURRENT_USER');
        expect(action.payload.data).to.be.a('object');
        expect(action.payload.data).to.have.property('id');
        expect(action.payload.data.id).to.be.a('number');
        done();
      });
  });

  it('should dispatch USER_LOGOUT action', (done) => {
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

});
