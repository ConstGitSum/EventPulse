process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import { Home } from '../../client/components/Home';


describe('Home Component', () => {
  let mockStore;
  const initialState = { 
    eventListFiltered: [{
      id: 1,
      title: "Pokemongodb party",
      description: "Catch pokemon and do some coding",
      location: "701 Brazos St, Austin, TX 78701",
      time: "2016-08-30T13:00:00.000Z",
      guests: [],
    }],
    currentUser: {
      id: 1,
    },
    currentEvent: {
      id: 1,
      title: "Pokemongodb party",
      description: "Catch pokemon and do some coding",
      location: "701 Brazos St, Austin, TX 78701",
      time: "2016-08-30T13:00:00.000Z",
      guests: [],
    }
  } 

  beforeEach(() => {
    mockStore = configureStore([])(initialState);
  });

  it('should render a facebook login link when logged out', () => {
    let currentUser = false;
    const fetchCurrentUser = () => currentUser = false;
    const component = renderIntoDocument(
      <Provider store={mockStore}>
        <Home 
          currentUser={currentUser}
          fetchCurrentUser={fetchCurrentUser} />
      </Provider>
    );
    const links = scryRenderedDOMComponentsWithTag(component, 'a');

    expect(links.length).to.equal(1);
    expect(links[0].textContent).to.equal('facebook!');
  })

  it('should render a logout button when logged in',() => {
    let currentUser = { id: 3 };
    const fetchCurrentUser = () => currentUser = { id: 3 };
    const component = renderIntoDocument(
      <Provider store={mockStore}>
        <Home 
          currentUser={currentUser}
          fetchCurrentUser={fetchCurrentUser} />
      </Provider>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const links = scryRenderedDOMComponentsWithTag(component, 'a');
    expect(buttons.length).to.equal(4);
    expect(links.length).to.equal(8);
    expect(buttons[3].textContent).to.equal('Log Out');
  })

})
