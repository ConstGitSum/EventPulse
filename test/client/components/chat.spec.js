process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';

import { shallow, mount } from 'enzyme';
import { ChatWindow } from '../../../client/components/Chat'

var io = require('socket.io-client');
var chai = require('chai');

var options ={
  transports: ['websocket'],
  'force new connection': true
};

xdescribe('EventDetails Component', () => {
  const seedData = { 
    currentUser: {
      id: 1,
      name:'Jad',
      image:'http://example.com'
    },
    event: {
      id: 1,
      created_by: 1,
      title: "Pokemongodb party",
      description: "Catch pokemon and do some coding",
      location: "701 Brazos St, Austin, TX 78701",
      time: "2016-08-30T13:00:00.000Z",
      guests: [{ id: 1, name: 'Alice' }],
    }
  } 
  const enzymeWrapper = shallow(<ChatWindow currentUser={seedData.currentEvent} event={seedData.currentUser} />)
  const message  = {
        text: 'Hello',
        name: 'Jad', // user ID  Might want currentUser to have name as well
        user_id: 1,
        event:1,
        image: 'http://example.com'
      }
  describe('Chat Window', () => {
    var socketURL = 'http://localhost:3000'
    var client1 = io.connect(socketURL, options);
    it('should send messages to socket.io', () => {
      client1.emit('message', message)
      // const paragraph = enzymeWrapper.find('p');
      // expect(paragraph).to.have.length(5)
      // expect(paragraph.at(0).text()).to.equal('Creator: Alice')
      // expect(paragraph.at(1).text()).to.equal('Title: Pokemongodb party')
      // expect(paragraph.at(2).text()).to.equal('Description: Catch pokemon and do some coding')
      // expect(paragraph.at(3).text()).to.equal('Location: 701 Brazos St, Austin, TX 78701')
      // expect(paragraph.at(4).text()).to.equal('Time: 2016-08-30T13:00:00.000Z')
    })
  })


})
