process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';
import { 
  renderIntoDocument, 
  scryRenderedDOMComponentsWithTag,
  Simulate 
} from 'react-addons-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

import { shallow, mount } from 'enzyme';
import ConnectedApp, { EventDetails } from '../../../client/components/EventDetails'


var chai = require('chai');

describe('EventDetails Component', () => {
  const seedData = { 
    currentUser: {
      id: 1
    },
    currentEvent: [{
      id: 1,
      title: 'Pokemongodb Party',
      description: 'Catch pokemon and do some coding',
      category: 'other',
      created_by: 1,
      location: '701 Brazos St, Austin, TX 78701',
      time: "2016-08-30T13:00:00.000Z",
      max_guests: null,
      duration: 10800,
      privacy: false,
      guests: [{ id: 1, name: 'Alice' }]
    },
    {
      id: 2,
      title: 'Pick-up basketball game',
      description: 'A friendly game of basketball',
      created_by: 2,
      location: '2100 Alamo St, Austin, TX 78722',
      time: '2016-08-30T10:00:00.000',
      max_guests: 10,
      duration: 3600,
      privacy: false,
      guests: [{ id: 2, name: 'Bob'}]
    },
    {
      id: 1,
      title: 'Pokemongodb party',
      description: 'Catch pokemon and do some coding',
      created_by: 1,
      location: '701 Brazos St, Austin, TX 78701',
      time: '2016-08-30T08:00:00.000',
      max_guests: null,
      duration: 10800,
      privacy: false,
      guests: []
    }],
    hiddenEvents: []
  }

  const enzymeWrapper = shallow(<EventDetails
    currentEvent={ seedData.currentEvent[0] }
    currentUser={ seedData.currentUser }
    hiddenEvents={ seedData.hiddenEvents } />)

  const enzymeWrapper2 = shallow(<EventDetails
    currentEvent={ seedData.currentEvent[1] }
    currentUser={ seedData.currentUser }
    hiddenEvents={ seedData.hiddenEvents } />)

  const enzymeWrapper3 = shallow(<EventDetails
    currentEvent={ seedData.currentEvent[2] }
    currentUser={ seedData.currentUser }
    hiddenEvents={ seedData.hiddenEvents } />)

  it('should display the title of the event', () => {
    const h2 = enzymeWrapper.find('h2');
    expect(h2).to.have.length(1);
    expect(h2.at(0).text()).to.equal('Pokemongodb Party');
  })

  it('should display the location of the event', () => {
    const h4 = enzymeWrapper.find('h4');
    expect(h4).to.have.length(5);
    expect(h4.at(0).text()).to.equal('701 Brazos St, Austin, TX 78701');
  })

  it('should display a join button if not joined', () => {
    const button = enzymeWrapper2.find('button');
    expect(button).to.have.length(2)
    expect(button.at(0).text()).to.equal('Join');
  })

  it('should display a join button if not joined', () => {
    const button = enzymeWrapper.find('button');
    expect(button).to.have.length(2)
    expect(button.at(0).text()).to.equal('Leave');
  })

  it('should display a chat button', () => {
    const button = enzymeWrapper2.find('button');
    expect(button).to.have.length(2)
    expect(button.at(1).text()).to.equal('Chat');
  })

  it('should display who created the event', () => {
    const td = enzymeWrapper.find('td');
    expect(td).to.have.length(15);
    expect(td.at(2).text()).to.equal('Alice');
  })

  it('should display who created the event (creator not in event', () => {
    const td = enzymeWrapper3.find('td');
    expect(td).to.have.length(15);
    expect(td.at(2).text()).to.equal('Creator is no longer in the event');
  })

  it('should display the category of the event', () => {
    const td = enzymeWrapper.find('td');
    expect(td).to.have.length(15);
    expect(td.at(5).text()).to.equal('other');
  })

  it('should display the description of the event', () => {
    const td = enzymeWrapper.find('td');
    expect(td).to.have.length(15);
    expect(td.at(8).text()).to.equal('Catch pokemon and do some coding');
  })

  it('should display the duration of the event', () => {
    const td = enzymeWrapper.find('td');
    expect(td).to.have.length(15);
    expect(td.at(11).text()).to.equal('3 hours');
  })

  it('should display the start time of the event', () => {
    const td = enzymeWrapper.find('td');
    expect(td).to.have.length(15);
    expect(td.at(14).text()).to.equal('Tuesday, 8:00 am');
  })
})
