process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';
import sd from 'skin-deep';
import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import axios from 'axios'; 
import { shallow, describeWithDOM, mount, spyLifecycle } from 'enzyme';  
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import EventList from '../../client/components/EventList';

describe('EventList Component', () => {
  const initialState = { 
    eventList: [],
    currentUser: { id: 1 },
    currentEvent: {}
  } 
  const mockStore = configureStore([])(initialState);

  it('should render a div with class event-list', () => {
    const component = renderIntoDocument(
      <Provider store={mockStore}>
        <EventList />
      </Provider>
    );

    const list = scryRenderedDOMComponentsWithClass(component, 'event-list');
    expect(list.length).to.equal(1);
  });


  it('should call componentDidMount lifecycle method', () => {
    sinon.spy(EventList.prototype, 'componentDidMount');

    const component = renderIntoDocument(
      <Provider store={mockStore}>
        <EventList />
      </Provider>
    );

    expect(EventList.prototype.componentDidMount.calledOnce).to.equal(true);
  }); 

  xit('should update the state after axios call in `componentDidMount`', (done) => {
    const component = renderIntoDocument(
      <Provider store={mockStore}>
        <EventList />
      </Provider>
    );

    console.log(mockStore.getState().events)
    expect(mockStore.getState().eventList).to.be.instanceof(Array);
    expect(mockStore.getState().eventList.length).to.equal(1);
    expect(mockStore.getState().eventList[0].title).to.equal('Pokemongodb party');
    done();
  });

});
