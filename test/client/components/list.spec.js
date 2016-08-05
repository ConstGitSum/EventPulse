import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { List } from '../../../client/components/List';

describe('List Component', () => {
  function setup() {
    const props = {
      list: [{ id: 1 }, { id: 2 }],
      listFiltered: [{ id: 1}],
      hiddenEvents: [2],
      currentUser: { id: 1 },
      currentEvent: { id: 1 },
      getHiddenEvents: sinon.spy(),
      getList: sinon.spy(),
      filterList: sinon.spy(),
      userLogOut: sinon.spy(),
      setCurrentEvent: sinon.spy()
    }

    const enzymeWrapper = shallow(<List {...props} />);

    return {
      props,
      enzymeWrapper
    };
  }

  const { enzymeWrapper, props } = setup();

  describe('Display list', () => {
    it('should render correctly', () => {
      expect(enzymeWrapper.find('.event-list')).to.be.ok;
      expect(enzymeWrapper.find('.event-item')).to.be.ok;
      expect(enzymeWrapper.find('Connect(ListFilter)')).to.be.ok;
    });
  });

  describe('Buttons', () => {
    it('should render buttons correctly', () => {
      const buttons = enzymeWrapper.find('button');  
      expect(buttons).to.have.length(3);
      expect(buttons.at(0).text()).to.equal('View Event Details');
      expect(buttons.at(1).text()).to.equal('Create');
      expect(buttons.at(2).text()).to.equal('Log Out');
    });

    it('should render links correctly', () => {
      const links = enzymeWrapper.find('Link');
      expect(links).to.have.length(2);
      expect(links.at(0).node.props.to).to.equal('/1');
      expect(links.at(1).node.props.to).to.equal('/create');
    });

    it('should call setCurrentEvent when clicking an event list item', () => {
      expect(props.setCurrentEvent.calledOnce).to.equal(false);
      enzymeWrapper.find('.event-item').simulate('click');
      expect(props.setCurrentEvent.calledOnce).to.equal(true);
    });

    it('should call userLogOut when clicking the Log Out button', () => {
      expect(props.userLogOut.calledOnce).to.equal(false);
      enzymeWrapper.find('.logout').simulate('click');
      expect(props.userLogOut.calledOnce).to.equal(true);
    });
  });
  
});
