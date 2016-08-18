import configureStore from 'redux-mock-store';
import { expect } from 'chai';

import * as actions from '../../../client/actions/actions';

const mockStore = configureStore([]);

describe('Modal Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch TOGGLE_CHAT_MODAL action', () => {
    store.dispatch(actions.toggleChatModal());
    const action = store.getActions()[0];
    expect(action.type).to.equal('TOGGLE_CHAT_MODAL');
  });

});
