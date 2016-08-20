import React from 'react';
import { render } from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import { Sidebar } from '../../../client/components/Sidebar';

describe('Sidebar Component', () => {
	const seedData = { 
	  currentUser: {
	    id: 1
	  },
	  currentEvent: [{
	    id: 1,
	    title: 'Pokemongodb Party',
	    description: 'Catch pokemon and do some coding',
	    category: 'other',
	    created_by: 1,
	    location: '701 Brazos St, Austin, TX 78701',
	    time: "2016-08-30T13:00:00.000Z",
	    duration: 10800,
	    privacy: false,
	    guests: [{ id: 1, name: 'Alice' }]
	  },
	  {
	    id: 2,
	    title: 'Pick-up basketball game',
	    description: 'A friendly game of basketball',
	    created_by: 2,
	    location: '2100 Alamo St, Austin, TX 78722',
	    time: '2016-08-30T10:00:00.000',
	    max_guests: 10,
	    duration: 3600,
	    privacy: false,
	    guests: [{ id: 2, name: 'Bob'}]
	  },
	  {
	    id: 3,
	    title: 'Pokemongodb party',
	    description: 'Catch pokemon and do some coding',
	    created_by: 2,
	    location: '701 Brazos St, Austin, TX 78701',
	    time: '2016-08-30T08:00:00.000',
	    max_guests: null,
	    duration: 10800,
	    privacy: false,
	    guests: []
	  }],
	  hiddenEvents: [3]
	}

	function setup() {
		const props = {
			currentUser: seedData.currentUser,
			currentEvent: seedData.currentEvent[0],
			hiddenEvents: seedData.hiddenEvents,
			editEvent: sinon.spy(),
			hideEvent: sinon.spy(),
			unhideEvent: sinon.spy()
		}

		const enzymeWrapper4 = shallow(<Sidebar {...props} />);

		return {
			props,
			enzymeWrapper4
		}
	}

	const { enzymeWrapper4, props } = setup();

	/*
		User is the creator and in the event
	 */
	const enzymeWrapper = shallow(<Sidebar
		currentEvent={ seedData.currentEvent[0] }
		currentUser={ seedData.currentUser}
		hiddenEvents={ seedData.hiddenEvents } />)
	/*
		User is not the creator and not in the event
	 */
	const enzymeWrapper2 = shallow(<Sidebar
		currentEvent={ seedData.currentEvent[1] }
		currentUser={ seedData.currentUser}
		hiddenEvents={ seedData.hiddenEvents } />)

	const enzymeWrapper3 = shallow(<Sidebar
		currentEvent={ seedData.currentEvent[2] }
		currentUser={ seedData.currentUser}
		hiddenEvents={ seedData.hiddenEvents } />)

	it('should display guest button', () => {
		const button = enzymeWrapper.find('p');
		expect(button).to.have.length(2);
		expect(button.at(1).text()).to.equal('Guests');
	})

	it('should display edit button if user is the creator', () => {
		const button = enzymeWrapper.find('p');
		expect(button).to.have.length(2);
		expect(button.at(0).text()).to.equal('Edit');
	})

	it('should not display edit button if user is not the creator', () => {
		const button = enzymeWrapper2.find('p');
		expect(button).to.have.length(2);
		expect(button.at(0).text()).to.not.equal('Edit');
	})

	it('should display hide button if user is not the creator', () => {
		const button = enzymeWrapper2.find('p');
		expect(button).to.have.length(2);
		expect(button.at(0).text()).to.equal('Hide');
	})

	it('should not display hide button if user has hidden the event', () => {
		const button = enzymeWrapper3.find('p');
		expect(button).to.have.length(2);
		expect(button.at(0).text()).to.not.equal('Hide');
	})

	it('should display show button if user has hidden the event', () => {
		const button = enzymeWrapper3.find('p');
		expect(button).to.have.length(2);
		expect(button.at(0).text()).to.equal('Show');
	})
	/*
		Need to figure out a way of dealing with react-router
		React-router -> Docs -> Guides -> testing.md
		TypeError: Cannot read property 'removeItem' of undefined
	 */
	xit('should call editEvent when clicking on edit button', () => {
		expect(props.editEvent.calledOnce).to.equal(false);
		enzymeWrapper4.find('li').at(0).simulate('click');
		expect(props.editEvent.calledOnce).to.equal(true);
	})
	/*
		Same as ^
	 */
	xit('should call hideEvent when clicking on hide button', () => {
		expect(props.hideEvent.calledOnce).to.equal(false);
		enzymeWrapper4.find('li').at(0).simulate('click');
		expect(props.hideEvent.calledOnce).to.equal(true);
	})
	/*
		Same as ^
	 */
	xit('should call unhideEvent when clicking on show button', () => {
		expect(props.unhideEvent.calledOnce).to.equal(false);
		enzymeWrapper4.find('li').at(0).simulate('click');
		expect(props.unhideEvent.calledOnce).to.equal(true);
	})
})