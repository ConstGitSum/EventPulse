import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import { EventDetails } from '../../client/components/EventDetails'

var chai = require('chai');

describe('EventDetails', () => {

  const seedData = { title: "TDD Test Title",
                     description: "TDD Test Description",
                     location: "TDD Test Location",
                     time: "TDD Test Time"
                   }
  const component = renderIntoDocument(<EventDetails currentEvent={seedData} />)

  describe('Display data', () => {
    it('should display data', () => {
      const paragraph = scryRenderedDOMComponentsWithTag(component, 'p')
      expect(paragraph.length).to.equal(4)
      expect(paragraph[0].textContent).to.equal('Title: TDD Test Title')
      expect(paragraph[1].textContent).to.equal('Description: TDD Test Description')
      expect(paragraph[2].textContent).to.equal('Location: TDD Test Location')
      expect(paragraph[3].textContent).to.equal('Time: TDD Test Time')
    })
  })

  describe('Display Buttons', () => {
    it('should display a Join, Hide and Chat buttons', () => {
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons.length).to.equal(3);
      expect(buttons[0].textContent).to.equal('Join')
      expect(buttons[1].textContent).to.equal('Hide')
      expect(buttons[2].textContent).to.equal('Chat')
    })
  })

})