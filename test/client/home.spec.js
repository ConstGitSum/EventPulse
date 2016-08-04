import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Home } from '../../client/components/Home';

function setup(logged) {
  const props = {
    currentUser: logged,
    getCurrentUser: sinon.spy()
  }

  const enzymeWrapper = shallow(
      <Home {...props} /> 
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('Home Component', () => {
  it('should render Auth when not logged in', () => {
    const { enzymeWrapper, props } = setup(false)
    expect(props.getCurrentUser.calledOnce).to.equal(true);
    expect(enzymeWrapper.find('Connect(Auth)').length).to.equal(1);
    expect(enzymeWrapper.find('Connect(List)').length).to.equal(0);
  })

  it('should render List when logged in', () => {
    const { enzymeWrapper, props } = setup({ id: 1 })
    expect(props.getCurrentUser.calledOnce).to.equal(true);
    expect(enzymeWrapper.find('Connect(Auth)').length).to.equal(0);
    expect(enzymeWrapper.find('Connect(List)').length).to.equal(1);
  })
})
