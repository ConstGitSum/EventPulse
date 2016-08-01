import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';

import {EventCreate} from '../../client/components/EventCreate';

var chai = require('chai');

describe('Create', () => {

  describe('Display Form Labels', () => {
    xit('should display labels', () => {
      const component = renderIntoDocument(<EventCreate />)
      const Field = scryRenderedDOMComponentsWithTag(component, 'Field')
      expect(Field.length).to.equal(9)
      expect(Field[0].textContent).to.equal('Event Title')
      expect(Field[1].textContent).to.equal('Description')
      expect(Field[2].textContent).to.equal('Location')
      expect(Field[3].textContent).to.equal('Date')
      expect(Field[4].textContent).to.equal('Start Time')
      expect(Field[5].textContent).to.equal('End Time')
      expect(Field[6].textContent).to.equal('Number of Guests')
      expect(Field[7].textContent).to.equal('Privacy')
      expect(Field[8].textContent).to.equal('Visibility')
    })
  })

  describe('Display Form inputs', () => {
    xit('should display inputs', () => {
      const component = renderIntoDocument(<EventCreate />)
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input')
      const textarea = scryRenderedDOMComponentsWithTag(component, 'textarea')
      expect(inputs.length).to.equal(8)
      expect(textarea.length).to.equal(1)
    })
    xit('should change input value', () => {
      const component = renderIntoDocument(<EventCreate />)
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input')
      console.log('inputs[0]~~~~~',inputs[0])
      // const node = inputs[0];
      // node.value='pokemon';
      Simulate.change(inputs[0], { target: { value: 'pokemon' } });
      Simulate.keyDown(inputs[0], {key: "Enter", keyCode: 13, which: 13});
      expect(inputs[0].state.inputValue).toEqual('pokemon');
    })
  })

  describe('Display Button', () => {
    xit('should display a Create Event button', () => {
      const component = renderIntoDocument(<EventCreate />)
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons.length).to.equal(1);
      expect(buttons[0].textContent).to.equal('Create Event')
    })
  })

})