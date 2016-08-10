import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import L from 'leaflet';

import { EventMap } from '../../../client/components/EventMap';
//
//xdescribe('List Component', () => {
//  function setup() {
//    const props = {
//      listFiltered: [{ id: 1}, { id: 2}],
//      currentEvent: {},
//      map: {
//        currMarker: {},
//        prevMarker: {}
//      },
//      setCurrentEvent: sinon.spy(),
//      setCurrMarker: sinon.spy(),
//      setPrevMarker: sinon.spy()
//    }
//    const enzymeWrapper = mount(<EventMap {...props} />);
//
//    return {
//      props,
//      enzymeWrapper
//    };
//  }
//
//  const { enzymeWrapper, props } = setup();
//
//  describe('Display map', () => {
//    it('should render correctly', () => {
//      console.log(enzymeWrapper.debug());
//    });
//  });
//  
//});
