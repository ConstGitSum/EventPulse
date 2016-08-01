process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';

import { EventDetails } from '../../client/components/EventDetails'
import reducer_eventDetails from '../../client/reducers/reducer_eventDetails'

var chai = require('chai');

describe('EventDetails', () => {
  const seedData = { 
    eventsList: [{
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

  const component = renderIntoDocument(
    <EventDetails 
      currentEvent={seedData.currentEvent} 
      currentUser={seedData.currentUser} />
  )

  describe('Reducer - EventDetails', () => {
    it('should handles JOIN_EVENT', () => {
      const initialState = seedData
      const action = {
        type: 'JOIN_EVENT',
        payload: {
          data: {
            id: 1
          }
        }
      }
      const nextState = reducer_eventDetails(initialState, action)

      expect(nextState.currentEvent.guests[0]).to.deep.equal({id: 1})
    })

    it('should handle HIDE_EVENT', () => {
      const initialState = seedData
      const action = {
        type: 'HIDE_EVENT',
        payload: {}
      }
      const nextState = reducer_eventDetails(initialState, action)

      expect(nextState.currentEvent).to.deep.equal({})
    })

  })

  describe('Display data', () => {
    it('should display data', () => {
      const paragraph = scryRenderedDOMComponentsWithTag(component, 'p')
      expect(paragraph.length).to.equal(4)
      expect(paragraph[0].textContent).to.equal('Title: Pokemongodb party')
      expect(paragraph[1].textContent).to.equal('Description: Catch pokemon and do some coding')
      expect(paragraph[2].textContent).to.equal('Location: 701 Brazos St, Austin, TX 78701')
      expect(paragraph[3].textContent).to.equal('Time: 2016-08-30T13:00:00.000Z')
    })
  })

  describe('Buttons', () => {
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    it('should display a Join, Hide and Chat buttons', () => {
      expect(buttons.length).to.equal(3);
      expect(buttons[0].textContent).to.equal('Join')
      expect(buttons[1].textContent).to.equal('Hide')
      expect(buttons[2].textContent).to.equal('Chat')
    })
  })

})