import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import {Create} from '../../client/components/Create';

var chai = require('chai');

describe('Create', () => {

  describe('Display Form Labels', () => {
    it('should display labels', () => {
      const component = renderIntoDocument(<Create />)
      const label = scryRenderedDOMComponentsWithTag(component, 'label')
      console.log('label~~~~',label)
      expect(label.length).to.equal(9)
      expect(label[0].textContent).to.equal('Event Title')
      expect(label[1].textContent).to.equal('Description')
      expect(label[2].textContent).to.equal('Location')
      expect(label[3].textContent).to.equal('Date')
      expect(label[4].textContent).to.equal('Start Time')
      expect(label[5].textContent).to.equal('End Time')
      expect(label[6].textContent).to.equal('Number of Guests')
      expect(label[7].textContent).to.equal('Privacy')
      expect(label[8].textContent).to.equal('Visibility')
    })
  })

  describe('Display Button', () => {
    it('should display a Create Event button', () => {
      const seedData = { title: "TDD Test Title",
                         description: "TDD Test Description",
                         location: "TDD Test Location",
                         time: "TDD Test Time"
                       }
      const component = renderIntoDocument(<Create event={ seedData } />)
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons.length).to.equal(1);
      expect(buttons[0].textContent).to.equal('Create Event')
    })
  })

})