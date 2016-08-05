import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import { Create } from '../../../client/components/Create';

var chai = require('chai');

describe("EventCreate Component", () => {

  describe('Display form', () => {
    it('should display title, description, location, time, duration, guests', () => {
      const component = renderIntoDocument(<Create currentUser={{id:1}}/>)
      const labels = scryRenderedDOMComponentsWithTag(component, 'label')
      expect(labels[0].textContent).to.equal('Title')
      expect(labels[1].textContent).to.equal('Description')
      expect(labels[2].textContent).to.equal('Location')
      expect(labels[3].textContent).to.equal('Time')
      expect(labels[4].textContent).to.equal('Duration')
      expect(labels[5].textContent).to.equal('Guests')
    })

    it('should display privacy and visibility', () => {
      const component = renderIntoDocument(<Create currentUser={{id:1}}/>)
      const labels = scryRenderedDOMComponentsWithTag(component, 'label')
      expect(labels[6].textContent).to.equal('Privacy')
      expect(labels[9].textContent).to.equal('Visibility')
    })
  })

  describe('Display Button', () => {
    it('should display Submit and Clear Values buttons', () => {
      const component = renderIntoDocument(<Create currentUser={{id:1}}/>)
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons.length).to.equal(2);
      expect(buttons[0].textContent).to.equal('Submit')
      expect(buttons[1].textContent).to.equal('Clear Values')
    })
  })
})
