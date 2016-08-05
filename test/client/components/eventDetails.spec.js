process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';

import { shallow, mount } from 'enzyme';
import { EventDetails } from '../../../client/components/EventDetails'


var chai = require('chai');

describe('EventDetails Component', () => {
  const seedData = { 
    currentUser: {
      id: 1,
    },
    currentEvent: {
      id: 1,
      created_by: 1,
      title: "Pokemongodb party",
      description: "Catch pokemon and do some coding",
      location: "701 Brazos St, Austin, TX 78701",
      time: "2016-08-30T13:00:00.000Z",
      guests: [{ id: 1, name: 'Alice' }],
    }
  } 
  const enzymeWrapper = shallow(<EventDetails currentEvent={seedData.currentEvent} currentUser={seedData.currentUser} />)

  describe('Display data', () => {
    it('should display data', () => {

      const paragraph = enzymeWrapper.find('p');
      expect(paragraph).to.have.length(5)
      expect(paragraph.at(0).text()).to.equal('Creator: Alice')
      expect(paragraph.at(1).text()).to.equal('Title: Pokemongodb party')
      expect(paragraph.at(2).text()).to.equal('Description: Catch pokemon and do some coding')
      expect(paragraph.at(3).text()).to.equal('Location: 701 Brazos St, Austin, TX 78701')
      expect(paragraph.at(4).text()).to.equal('Time: 2016-08-30T13:00:00.000Z')
    })
  })

  describe('Buttons', () => {

    it('should display a Join, Hide and Chat buttons', () => {
      const buttons = enzymeWrapper.find('button');
      expect(buttons).to.have.length(3);
      expect(buttons.at(0).text()).to.equal('Leave');
      expect(buttons.at(1).text()).to.equal('Chat');
      expect(buttons.at(2).text()).to.equal('Back');
    })
  })

})
