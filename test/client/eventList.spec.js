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
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';

import EventList from '../../client/components/EventList';

xdescribe('EventList Component', () => {
  const initialState = { 
    eventList: [{
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
  const mockStore = configureStore([])(initialState);
  let wrapper; 

  it('renders as a <div>', () => {
    const component = renderIntoDocument(
      <Provider store={mockStore}>
        <EventList />
      </Provider>
    );

    expect(wrapper.type()).to.eql('div');
  });

  it('Renders the root `div` with the right class', () => {
      wrapper = shallow(<EventList />);
      expect(wrapper.find('.event-items')).to.have.length(1);
    });

  it('Calls componentDidMount lifecycle method', () => {
      sinon.spy(EventList.prototype, 'componentDidMount');
      wrapper = mount(<EventList />);
      expect(EventList.prototype.componentDidMount.calledOnce).to.equal(true);
    }); 

    it('Correctly updates the state after axios call in `componentDidMount` was made', () => {
    axios.get('/api/events').then((eventData) => {
      this.setState({events: eventData.data})
      })
      wrapper = mount(<EventList />);
      setTimeout(function() {
        expect(wrapper.state().events).to.be.instanceof(Array);
        expect(wrapper.state().events.length).to.equal(1);
        expect(wrapper.state().events[0].title).to.equal('Pokemongodb party');
        expect(wrapper.state().events[0].location).to.equal('701 Brazos St, Austin, TX 78701');
      }, 0);
  });
});
