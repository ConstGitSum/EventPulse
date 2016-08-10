import configureStore from 'redux-mock-store';
import ReduxPromise from 'redux-promise';
import moxios from 'moxios';
import { expect } from 'chai';

import * as actions from '../../../client/actions/actions';

const middlewares = [ReduxPromise];
const mockStore = configureStore(middlewares);

// Test example with mocha and expect
describe('List Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch GET_EVENTS action', (done) => {
    moxios.stubRequest('/api/events', {
      status: 200,
      responseText: [{ id: 1 }]
    });
    moxios.stubRequest('/api/events/1/guests', {
      status: 200,
      responseText: [{ user_id: 1, event_id: 1 }]
    });

    return store.dispatch(actions.getList())
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('GET_EVENTS');
        expect(action.payload).to.be.a('array');
        expect(action.payload[0]).to.have.property('guests');
        expect(action.payload[0].guests).to.be.a('array');
        done();
      });
  });

  describe('should dispatch FILTER_EVENTS action', () => {
    const list = [
      { id: 1, created_by: 1, guests:[{ id: 1, status: 'accepted' }], latitude: 10, longitude: 10 },
      { id: 2, created_by: 2, guests:[{ id: 2, status: 'accepted' }], latitude: 10, longitude: 10 },
      { id: 3, created_by: 3, guests:[{ id: 3, status: 'accepted' }], latitude: 10, longitude: 10 },
    ];
    const userId = 1;
    const hiddenEvents = [3];
    const location = { lat: 10, lng: 10 }
      
    it('should deliver payload correctly for `unhidden` filter', (done) => {
      store.dispatch(actions.filterList(list, 'unhidden', userId, hiddenEvents, location));
      const action = store.getActions()[0];
      expect(action.type).to.equal('FILTER_EVENTS');
      expect(action.payload).to.be.a('array');
      expect(action.payload).to.have.length(2);
      expect(action.payload[0].id).to.equal(1);
      done();
    });

    it('should deliver payload correctly for `hidden` filter', (done) => {
      store.dispatch(actions.filterList(list, 'hidden', userId, hiddenEvents, location));
      const action = store.getActions()[0];
      expect(action.type).to.equal('FILTER_EVENTS');
      expect(action.payload).to.be.a('array');
      expect(action.payload).to.have.length(1);
      expect(action.payload[0].id).to.equal(3);
      done();
    });

    it('should deliver payload correctly for `created` filter', (done) => {
      store.dispatch(actions.filterList(list, 'created', userId, hiddenEvents, location));
      const action = store.getActions()[0];
      expect(action.type).to.equal('FILTER_EVENTS');
      expect(action.payload).to.be.a('array');
      expect(action.payload).to.have.length(1);
      expect(action.payload[0].id).to.equal(1);
      done();
    });

    it('should deliver payload correctly for `joined` filter', (done) => {
      store.dispatch(actions.filterList(list, 'joined', userId, hiddenEvents, location));
      const action = store.getActions()[0];
      expect(action.type).to.equal('FILTER_EVENTS');
      expect(action.payload).to.be.a('array');
      expect(action.payload).to.have.length(1);
      expect(action.payload[0].id).to.equal(1);
      done();
    });

    it('should deliver payload correctly for `pending` filter', (done) => {
      store.dispatch(actions.filterList(list, 'pending', userId, hiddenEvents, location));
      const action = store.getActions()[0];
      expect(action.type).to.equal('FILTER_EVENTS');
      expect(action.payload).to.be.a('array');
      expect(action.payload).to.have.length(0);
      done();
    });
  });

});
