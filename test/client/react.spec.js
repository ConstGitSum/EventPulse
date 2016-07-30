process.env.NODE_ENV = 'test';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import reducer from '../../client/reducers'

import {App} from '../../client/components/App'

import {expect} from 'chai';
var chai = require('chai');

describe('reducers', () => {

  it("handles FETCH_PULSE", () => {
    const initialState = {pulse:0, logState:false};
    const action = {
      type: 'FETCH_PULSE',
      payload: 1
    }
    const nextState = reducer(initialState, action);
    expect(nextState.pulse).to.equal(1);
    expect(nextState.logState).to.equal(false);
  })

  it("handles FETCH_LOGSTATE", () => {
    const initialState = {pulse:0, logState:false};
    const action = {
      type:'FETCH_LOGSTATE',
      payload: true
    }
    const nextState = reducer(initialState, action);
    expect(nextState.pulse).to.equal(0);
    expect(nextState.logState).to.equal(true);
  })

  it("handles undefined state", () => {
    const action = {
      type: 'FETCH_LOGSTATE',
      payload: true
    }
    const nextState = reducer(undefined, action);
    expect(nextState.pulse).to.equal(0);
    expect(nextState.logState).to.equal(true);
  })
})

describe('Log In Component', () => {

  it('renders a button and a link when logged out', () => {
    const component = renderIntoDocument(<App pulse={1} logState={false}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const links = scryRenderedDOMComponentsWithTag(component, 'a');
    expect(buttons.length).to.equal(1);
    expect(links.length).to.equal(1);
    expect(buttons[0].textContent).to.equal('Pulse it ');
    expect(links[0].textContent).to.equal('facebook!');

  })

  it('renders 2 buttons when logged in',() => {
    const component = renderIntoDocument(<App pulse={1} logState={true}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const links = scryRenderedDOMComponentsWithTag(component, 'a');
    expect(buttons.length).to.equal(2);
    expect(links.length).to.equal(0);
    expect(buttons[0].textContent).to.equal('Pulse it ');
    expect(buttons[1].textContent).to.equal('Log Out');
  })

  xit('it logs out when you click Log Out',() => {
    let logState = true;
    const logOutState = (state) => logState = state;
    const component = renderIntoDocument(<App pulse={1} logState={true} fetchPulse={logOutState}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[1]);
    expect(logState).to.equal(false);
  })
})
