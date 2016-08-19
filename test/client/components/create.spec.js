import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { Create } from '../../../client/components/Create';

var chai = require('chai');

describe('Create Component', () => {
  function setup() {
    const props = {
      currentUser: {id:1},
      eventFormData : {
        title: 'myTitle',
        description: 'myDescription',
        created_by: 1,
        location: 'location',
        time: 5,
        duration: 5,
        max_guests: 9,
        endTime: '',
        category:'other',
        privacy: false
      },
      validationErrors: {},
      clearFormValues: sinon.spy(),
      validateEventForm: sinon.spy(),
    }
    const enzymeWrapper = shallow(<Create {...props} />);

    return {
      props,
      enzymeWrapper
    };
  }

  const { enzymeWrapper, props } = setup(false);

  describe('Display form', () => {
    it('should render correctly', () => {
      expect(enzymeWrapper.find('.event-create')).to.be.ok;
      expect(enzymeWrapper.find('.container')).to.be.ok;
      expect(enzymeWrapper.find('.scroll')).to.be.ok;
      expect(enzymeWrapper.find('.create-form')).to.be.ok;
      expect(enzymeWrapper.find('.required')).to.be.ok;
      expect(enzymeWrapper.find('.more-option')).to.be.ok;
      expect(enzymeWrapper.find('.footer')).to.be.ok;
      expect(enzymeWrapper.find('Connect(Create)')).to.be.ok;
    });

    it('should display title, location, category, time', () => {
      const labels = enzymeWrapper.find('label');  
      expect(labels.at(0).text()).to.equal('Title*');
      expect(labels.at(1).text()).to.equal('Location*');
      expect(labels.at(2).text()).to.equal('Category*');
      expect(labels.at(3).text()).to.equal('Time*');
    });

    it('should display duration and capacity, privacy, description', () => {
      expect(enzymeWrapper.find('<select name="duration_hour">')).to.be.ok;
      expect(enzymeWrapper.find('<select name="duration_minute">')).to.be.ok;
      expect(enzymeWrapper.find('<input name="max_guests">')).to.be.ok;
      expect(enzymeWrapper.find('<input name="privacy">')).to.be.ok;
      expect(enzymeWrapper.find('<input name="description">')).to.be.ok;
    });
  });

  describe('Buttons', () => {
    it('should render buttons correctly', () => {
      const buttons = enzymeWrapper.find('button');  
      expect(buttons).to.have.length(3);
      expect(buttons.at(0).text()).to.equal('Clear Values');
      expect(buttons.at(1).text()).to.equal('More Options');
      expect(buttons.at(2).text()).to.equal('Create');
    })

    it('should render back link correctly', () => {
      const links = enzymeWrapper.find('Link');
      expect(links).to.have.length(1);
      expect(links.at(0).node.props.to).to.equal('/');
    });

    it('should call clearFormValues when clicking on Clear Values', () => {
      expect(props.clearFormValues.calledOnce).to.equal(false);
      enzymeWrapper.find('.clear').simulate('click');
      expect(props.clearFormValues.calledOnce).to.equal(true);
    });

    it('should call validateEventForm when clicking on Create', () => {
      expect(props.validateEventForm.calledOnce).to.equal(false);
      enzymeWrapper.find('.create').simulate('click', { preventDefault() {} });
      expect(props.validateEventForm.calledOnce).to.equal(true);
    });
  }); 
});