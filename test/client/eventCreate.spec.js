import React from 'react';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

import { EventCreate } from '../../client/components/EventCreate';

chai.use(chaiEnzyme());

describe("EventCreate Component", () => {
  let subject = null;
  let submitting, touched, error;
  beforeEach(() => {
    submitting = false;
    touched = false;
    error = null;
  })

  const buildSubject = () => {
    const props = {
      submitting: submitting,
      fields: {
        title: {
          value: '',
          touched: touched,
          error: error
        }
      }
    }
    return shallow(<EventCreate {...props}/>)
  }

  subject = buildSubject().node.props.children;

  context("Title and Form", () => {
    it("should display a title and a form", () => {     
      expect(subject).to.exist;
      expect(subject[0].props.children).to.equal('Create New Event');
      expect(subject[1].type).to.equal('form');
    })
  }),

  context("All Fields", () => {
    it("should display title, description, location, date, duration, guests", () => {
      let fields = [];
      subject[1].props.children.forEach(element => {
        element.props.name? fields.push(element.props.name):null;        
      })
      expect(fields.indexOf('title') >= 0).to.equal(true);
      expect(fields.indexOf('description') >= 0).to.equal(true);
      expect(fields.indexOf('location') >= 0).to.equal(true);
      expect(fields.indexOf('date') >= 0).to.equal(true);
      expect(fields.indexOf('duration') >= 0).to.equal(true);
      expect(fields.indexOf('guests') >= 0).to.equal(true);
    }),

    it("should display privacy and visibility", () => {
      let fields = [];
      subject[1].props.children.forEach(element => {
        element.props.children? fields.push(element.props.children):null;
      })
      expect(fields.indexOf('Privacy') >= 0).to.equal(true);
      expect(fields.indexOf('Visibility') >= 0).to.equal(true);    
    }),

    it("should display Create Event button and Clear Values button", () => {
      let fields = [];
      let length = subject[1].props.children.length;
      let buttons = subject[1].props.children[length-1].props.children;
      buttons.forEach(element => {
        element.props.children? fields.push(element.props.children):null;
      })
      expect(fields.indexOf('Create Event') >= 0).to.equal(true);
      expect(fields.indexOf('Clear Values') >= 0).to.equal(true);    
    })
  })
})
