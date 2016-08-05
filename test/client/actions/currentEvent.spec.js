import configureStore from 'redux-mock-store';
import ReduxPromise from 'redux-promise';
import moxios from 'moxios';
import { expect } from 'chai';

import * as actions from '../../../client/actions/actions';

const middlewares = [ReduxPromise];
const mockStore = configureStore(middlewares);

// Test example with mocha and expect
describe('currentEvent Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch SET_CURRENT_EVENT action', (done) => {
    store.dispatch(actions.setCurrentEvent({ id: 1, guests: [] }))
    const action = store.getActions()[0];
    expect(action.type).to.equal('SET_CURRENT_EVENT');
    expect(action.payload).to.be.a('object');
    expect(action.payload).to.have.property('id');
    expect(action.payload).to.have.property('guests');
    done();
  });

  it('should dispatch CREATE_EVENT action', (done) => {
    moxios.stubRequest('/api/events', {
      status: 201,
      responseText: { id: 1, guests: [{ id: 1, status: 'accepted' }] }
    });

    return store.dispatch(actions.create(1, 1))
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('CREATE_EVENT');
        expect(action.payload.data).to.be.a('object');
        expect(action.payload.data).to.have.property('id');
        expect(action.payload.data).to.have.property('guests');
        expect(action.payload.data.guests).to.be.a('array');
        done();
      });
  });

  it('should dispatch JOIN_EVENT action', (done) => {
    moxios.stubRequest('/api/events/1/guests', {
      status: 201,
      responseText: { id: 1, status: 'accepted' }
    });

    return store.dispatch(actions.joinEvent(1, 1))
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('JOIN_EVENT');
        expect(action.payload.data).to.be.a('object');
        expect(action.payload.data).to.have.property('id');
        expect(action.payload.data).to.have.property('status');
        done();
      });
  });

  it('should dispatch LEAVE_EVENT action', (done) => {
    moxios.stubRequest('/api/events/1/guests/1', {
      status: 200,
      responseText: { user_id: 1, event_id: 1 }
    });

    return store.dispatch(actions.leaveEvent(1, 1))
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('LEAVE_EVENT');
        expect(action.payload.data).to.be.a('object');
        expect(action.payload.data).to.have.property('user_id');
        expect(action.payload.data).to.have.property('event_id');
        done();
      });
  });

});
