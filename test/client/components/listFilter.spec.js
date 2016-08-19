import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { ListFilter } from '../../../client/components/ListFilter';

describe('ListFilter Component', () => {
  function setup() {
    const props = {
      list: [{ id: 1 }, { id: 2 }],
      hiddenEvents: [2],
      currentUser: { id: 1 },
      location: {lat: 10, lng: 10},
      filterList: sinon.spy()
    }

    const enzymeWrapper = shallow(<ListFilter {...props} />);

    return {
      props,
      enzymeWrapper
    };
  }

  const { enzymeWrapper, props } = setup();

  describe('Display ListFilter', () => {
    it('should render correctly', (done) => {
      const buttons = enzymeWrapper.find('MenuItem');
      expect(buttons.length).to.equal(5);
      expect(buttons.at(0).children().at(1).text()).to.equal('all');
      expect(buttons.at(1).children().at(1).text()).to.equal('unhidden');
      expect(buttons.at(2).children().at(1).text()).to.equal('hidden');
      expect(buttons.at(3).children().at(1).text()).to.equal('created');
      expect(buttons.at(4).children().at(1).text()).to.equal('joined');
      done();
    });

    it('should call filterList function with correct filter argument', (done) => {
      const buttons = enzymeWrapper.find('MenuItem');
      buttons.at(0).simulate('click');
      expect(props.filterList.called).to.equal(true);
      expect(props.filterList.lastCall.args[1]).to.equal('all');
      buttons.at(1).simulate('click');
      expect(props.filterList.lastCall.args[1]).to.equal('unhidden');
      buttons.at(2).simulate('click');
      expect(props.filterList.lastCall.args[1]).to.equal('hidden');
      buttons.at(3).simulate('click');
      expect(props.filterList.lastCall.args[1]).to.equal('created');
      buttons.at(4).simulate('click');
      expect(props.filterList.lastCall.args[1]).to.equal('joined');
      done();
    });
  });

});
