import configureStore from 'redux-mock-store';
import ReduxPromise from 'redux-promise';
import moxios from 'moxios';
import { expect } from 'chai';

import * as actions from '../../../client/actions/actions';

const middlewares = [ReduxPromise];
const mockStore = configureStore(middlewares);

// Test example with mocha and expect
describe('create Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch CREATE_EVENT action', (done) => {
    moxios.stubRequest('/api/events', {
      status: 201,
      responseText: { 
          title: 'title',
          description: 'description',
          created_by: 1,
          location: 'location',
          time: 5,
          duration: 5,
          max_guests: 9,
          privacy: false,
          group_visibility: null}
    });

    return store.dispatch(actions.createEvent({ 
          title: 'title',
          description: 'description',
          created_by: 1,
          location: 'location',
          time: 5,
          duration: 5,
          max_guests: 9,
          privacy: false,
          group_visibility: null}, 1))
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).to.equal('CREATE_EVENT');
        expect(action.payload.data).to.be.a('object');
        expect(action.payload.data).to.have.property('title');
        expect(action.payload.data).to.have.property('description');
        expect(action.payload.data).to.have.property('created_by');
        expect(action.payload.data).to.have.property('location');
        expect(action.payload.data).to.have.property('time');
        expect(action.payload.data).to.have.property('duration');
        expect(action.payload.data).to.have.property('max_guests');
        expect(action.payload.data).to.have.property('privacy');
        expect(action.payload.data).to.have.property('group_visibility');
        done();
      });
  });

  it('should dispatch VALIDATE_EVENT_FORM action', (done) => {
    store.dispatch(actions.validateEventForm({
      title: 'title',
      description: 'description',
      created_by: 1,
      location: 'location',
      time: 5,
      duration: 5,
      max_guests: 9,
      privacy: false,
      group_visibility: null
    }));
    const action = store.getActions()[0];
    expect(action.type).to.equal('VALIDATE_EVENT_FORM');
    expect(action.payload).to.be.a('object');
    expect(action.payload.formData).to.have.property('title');
    expect(action.payload.formData).to.have.property('description');
    expect(action.payload.formData).to.have.property('created_by');
    expect(action.payload.formData).to.have.property('location');
    expect(action.payload.formData).to.have.property('time');
    expect(action.payload.formData).to.have.property('duration');
    expect(action.payload.formData).to.have.property('max_guests');
    expect(action.payload.formData).to.have.property('privacy');
    expect(action.payload.formData).to.have.property('group_visibility');
    done();
  });

  it('should dispatch UPDATE_EVENT_FIELD action', (done) => {
    store.dispatch(actions.updateEventField('title','newTitle'));
    const action = store.getActions()[0];
    expect(action.type).to.equal('UPDATE_EVENT_FIELD');
    expect(action.payload).to.be.a('object');
    expect(action.payload).to.have.property('fieldKey');
    expect(action.payload).to.have.property('fieldValue');
    expect(action.payload.fieldKey).to.equal('title');
    expect(action.payload.fieldValue).to.equal('newTitle');
    done();
  });

  it('should dispatch CLEAR_FORM_VALUES action', (done) => {
    store.dispatch(actions.clearFormValues());
    const action = store.getActions()[0];
    expect(action.type).to.equal('CLEAR_FORM_VALUES');
    done();
  });
});
