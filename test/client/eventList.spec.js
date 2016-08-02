process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';
import sd from 'skin-deep';
import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import axios from 'axios'; 
import { shallow, describeWithDOM,mount,spyLifecycle} from 'enzyme';  
import { EventList } from '../../client/components/EventList';

let wrapper; 

describe('EventList Component', () => {
  it('renders as a <div>', () => {
    wrapper = shallow(<EventList />);
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
