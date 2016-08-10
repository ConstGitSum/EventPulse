import configureStore from 'redux-mock-store';
import ReduxPromise from 'redux-promise';
import moxios from 'moxios';
import { expect } from 'chai';

import * as actions from '../../../client/actions/actions';

const middlewares = [ReduxPromise];
const mockStore = configureStore(middlewares);

// Test example with mocha and expect
describe('currentEvent Actions', () => {
  const currentEvent = {
    category         : 'other',
    created_at       : null,
    created_by       : 2,
    description      : 'A friendly game of basketball',
    duration         : 3600,
    group_visibility : null,
    guests           : [2,1,3],
    id               : 2,
    latitude         : '30.2770933',
    location         : '2100 Alamo St, Austin, TX 78722',
    longitude        : '-97.7185537',
    max_guests       : 10,
    privacy          : false,
    time             : '2016-08-30T15:00:00.000Z',
    title            : 'Pick-up basketball game'

  }
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

  it('should dispatch EDIT_EVENT action', (done) => {
    store.dispatch(actions.editEvent(currentEvent))
    const action = store.getActions()[0];
    expect(action.type).to.equal('EDIT_EVENT');
    expect(action.payload).to.be.a('object');
    expect(action.payload).to.have.property('category');
    expect(action.payload.category).to.be.a('string');
    expect(action.payload.category).to.equal('other');
    expect(action.payload).to.have.property('created_at');
    expect(action.payload.created_at).to.be.a('null');
    expect(action.payload.created_at).to.equal(null);
    expect(action.payload).to.have.property('created_by');
    expect(action.payload.created_by).to.be.a('number');
    expect(action.payload.created_by).to.equal(2);
    expect(action.payload).to.have.property('description');
    expect(action.payload.description).to.be.a('string');
    expect(action.payload.description).to.equal('A friendly game of basketball');
    expect(action.payload).to.have.property('duration');
    expect(action.payload.duration).to.be.a('number');
    expect(action.payload.duration).to.equal(3600);
    expect(action.payload).to.have.property('group_visibility');
    expect(action.payload.group_visibility).to.be.a('null');
    expect(action.payload.group_visibility).to.equal(null);
    expect(action.payload).to.have.property('guests');
    expect(action.payload.guests).to.be.a('array');
    expect(action.payload.guests).to.deep.equal([2,1,3]);
    expect(action.payload).to.have.property('id');
    expect(action.payload.id).to.be.a('number');
    expect(action.payload.id).to.equal(2);
    expect(action.payload).to.have.property('latitude');
    expect(action.payload.latitude).to.be.a('string');
    expect(action.payload.latitude).to.equal('30.2770933');
    expect(action.payload).to.have.property('location');
    expect(action.payload.location).to.be.a('string');
    expect(action.payload.location).to.equal('2100 Alamo St, Austin, TX 78722');
    expect(action.payload).to.have.property('longitude');
    expect(action.payload.longitude).to.be.a('string');
    expect(action.payload.longitude).to.equal('-97.7185537');
    expect(action.payload).to.have.property('max_guests');
    expect(action.payload.max_guests).to.be.a('number');
    expect(action.payload.max_guests).to.equal(10);
    expect(action.payload).to.have.property('privacy');
    expect(action.payload.privacy).to.be.a('boolean');
    expect(action.payload.privacy).to.equal(false);
    expect(action.payload).to.have.property('time');
    expect(action.payload.time).to.be.a('string');
    expect(action.payload.time).to.equal('2016-08-30T15:00:00.000Z');
    expect(action.payload).to.have.a.property('time');
    expect(action.payload.title).to.be.a('string');
    expect(action.payload.title).to.equal('Pick-up basketball game');
    done();
  })

});
