import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { ListFilter } from '../../../client/components/ListFilter';

describe.only('ListFilter Component', () => {
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
    it('should render correctly', () => {
      const buttons = enzymeWrapper.find('MenuItem');
      console.log(buttons.debug());
      console.log(buttons.length)
    });
  });

});
