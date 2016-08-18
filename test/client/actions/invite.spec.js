import configureStore from 'redux-mock-store';
import { expect } from 'chai';

import * as actions from '../../../client/actions/actions';

const mockStore = configureStore([]);

describe('Invitations Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch GET_INVITATIONS action', (done) => {
    const invites = [];
    store.dispatch(actions.getInvitations(invites));
    const action = store.getActions()[0];
    expect(action.type).to.equal('GET_INVITATIONS');
    expect(action.payload).to.be.a('array');
    done();
  });

  it('should dispatch GET_ALL_INVITATIONS action', (done) => {
    const invites = [];
    store.dispatch(actions.getAllInvitations(invites));
    const action = store.getActions()[0];
    expect(action.type).to.equal('GET_ALL_INVITATIONS');
    expect(action.payload).to.be.a('array');
    done();
  });

  it('should dispatch REMOVE_INVITATION action', (done) => {
    const invite = [];
    store.dispatch(actions.removeInvitation(invite));
    const action = store.getActions()[0];
    expect(action.type).to.equal('REMOVE_INVITATION');
    expect(action.payload).to.be.a('array');
    done();
  });

});
