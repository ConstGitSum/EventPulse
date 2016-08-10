process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';

import { shallow, mount } from 'enzyme';
import { EventDetails } from '../../../client/components/EventDetails'


var chai = require('chai');

describe('EventDetails Component', () => {
  const seedData = { 
    currentUser: {
      id: 1
    },
    currentEvent: [{
      id: 1,
      title: 'Pokemongodb party',
      description: 'Catch pokemon and do some coding',
      created_by: 1,
      location: '701 Brazos St, Austin, TX 78701',
      time: '2016-08-30T08:00:00.000',
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
      duration: 10800,
      privacy: false,
      guests: []
    }],
    hiddenEvents: []
  } 
  const enzymeWrapper = shallow(<EventDetails
    currentEvent={seedData.currentEvent[0]}
    currentUser={seedData.currentUser}
    hiddenEvents={seedData.hiddenEvents} />)

  const enzymeWrapper2 = shallow(<EventDetails
    currentEvent={seedData.currentEvent[1]}
    currentUser={seedData.currentUser}
    hiddenEvents={seedData.hiddenEvents}/>)

  const enzymeWrapper3 = shallow(<EventDetails
    currentEvent={seedData.currentEvent[2]}
    currentUser={seedData.currentUser}
    hiddenEvents={seedData.hiddenEvents}/>)

  it('should display how many people can join (no max size)', () => {
    const paragraph = enzymeWrapper.find('p');
    expect(paragraph).to.have.length(5);
    expect(paragraph.at(0).text()).to.equal('Attendance: 1/');
  })

  it('should display how many people can join (max size)', () => {
    const paragraph = enzymeWrapper2.find('p');
    expect(paragraph).to.have.length(5);
    expect(paragraph.at(0).text()).to.equal('Attendance: 1/10');
  })

  it('should display leave if user has joined', () => {
    const button = enzymeWrapper.find('button')
    expect(button).to.have.length(2)
    expect(button.at(0).text()).to.equal('Leave')
  })

  it('should display join if user has not joined', () => {
    const button = enzymeWrapper2.find('button')
    expect(button).to.have.length(2)
    expect(button.at(0).text()).to.equal('Join')
  })

  it('should display that the creator is in the event', () => {
    const paragraph = enzymeWrapper.find('p');
    expect(paragraph).to.have.length(5);
    expect(paragraph.at(1).text()).to.equal('Creator: Alice')
  })

  it('should display that the creator is no longer in the event', () => {
    const paragraph = enzymeWrapper3.find('p');
    expect(paragraph).to.have.length(5);
    expect(paragraph.at(1).text()).to.equal('Creator: No longer in event')
  })

  it('should display the title of the event', () => {
    const h2 = enzymeWrapper.find('h2');
    expect(h2).to.have.length(1);
    expect(h2.at(0).text()).to.equal('Pokemongodb party')
  })

  it('should display the description of the event', () => {
    const paragraph = enzymeWrapper.find('p');
    expect(paragraph).to.have.length(5);
    expect(paragraph.at(2).text()).to.equal('Description: Catch pokemon and do some coding');
  })

  it('should display the location of the event', () => {
    const paragraph = enzymeWrapper.find('p');
    expect(paragraph).to.have.length(5);
    expect(paragraph.at(3).text()).to.equal('Location: 701 Brazos St, Austin, TX 78701');
  })

  it('should display the time of the event', () => {
    const paragraph = enzymeWrapper.find('p');
    expect(paragraph).to.have.length(5);
    expect(paragraph.at(4).text()).to.equal('Time: Tuesday, 8:00 am')
  })

  it('should display a Chat button when the user has joined the event', () => {
    const buttons = enzymeWrapper.find('button');
    expect(buttons).to.have.length(2);
    expect(buttons.at(1).text()).to.equal('Chat');
  })

  it('should display a Chat buttons when the user has not joined the event', () => {
    const buttons = enzymeWrapper3.find('button');
    expect(buttons).to.have.length(2);
    expect(buttons.at(1).text()).to.equal('Chat');
  })

  it('should display a back button', () =>{
    const icon = enzymeWrapper.find('i')
    expect(icon).to.have.length(1)
  })
})
