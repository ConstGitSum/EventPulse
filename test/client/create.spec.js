import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import {Create} from '../../client/components/Create';

var chai = require('chai');

describe('Create', () => {

  describe('Display labels', () => {
    xit('should display labels', () => {
      const seedData = { title: "TDD Test Title",
                         description: "TDD Test Description",
                         location: "TDD Test Location",
                         time: "TDD Test Time"
                       }
      const component = renderIntoDocument(<Create event={ seedData } />)
      const paragraph = scryRenderedDOMComponentsWithTag(component, 'label')
      console.log('paragraph~~~~',paragraph)
      expect(paragraph.length).to.equal(4)
      expect(paragraph[0].textContent).to.equal('Title: TDD Test Title')
      expect(paragraph[1].textContent).to.equal('Description: TDD Test Description')
      expect(paragraph[2].textContent).to.equal('Location: TDD Test Location')
      expect(paragraph[3].textContent).to.equal('Time: TDD Test Time')
    })

    describe('Display inputs', () => {
    xit('should display inputs', () => {
      const seedData = { title: "TDD Test Title",
                         description: "TDD Test Description",
                         location: "TDD Test Location",
                         time: "TDD Test Time"
                       }
      const component = renderIntoDocument(<Create event={ seedData } />)
      const paragraph = scryRenderedDOMComponentsWithTag(component, 'label')
      console.log('paragraph~~~~',paragraph)
      expect(paragraph.length).to.equal(4)
      expect(paragraph[0].textContent).to.equal('Title: TDD Test Title')
      expect(paragraph[1].textContent).to.equal('Description: TDD Test Description')
      expect(paragraph[2].textContent).to.equal('Location: TDD Test Location')
      expect(paragraph[3].textContent).to.equal('Time: TDD Test Time')
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