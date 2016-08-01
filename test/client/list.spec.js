process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';
import sd from 'skin-deep';
import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import { shallow, describeWithDOM,mount,spyLifecycle} from 'enzyme';  
import List from '../../client/components/List';

describe('List component', () => {
	it('renders as a <div>', () => {
		const wrapper = shallow(<List />);
		expect(wrapper.type()).to.eql('div');
	});
	it('contains a header', () => {
	    const wrapper = shallow(<List />);
	    expect(wrapper.find('.event_items')).to.have.length(1);
  	});

});
