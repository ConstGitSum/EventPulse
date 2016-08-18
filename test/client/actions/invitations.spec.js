import configureStore from 'redux-mock-store';
import { expect } from 'chai';

import * as actions from '../../../client/actions/actions';

const mockStore = configureStore([]);

describe('Invite Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch GET_INVITES action', (done) => {
    const inviteInfo = ['add', 1, 4, 4];
    store.dispatch(actions.addInvite(inviteInfo));
    const action = store.getActions()[0];
    expect(action.type).to.equal('GET_INVITES');
    expect(action.payload).to.be.a('array');
    done();
  });

});
