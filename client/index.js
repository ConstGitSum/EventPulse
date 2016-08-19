import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import Home from './components/Home'
import EventDetails from './components/EventDetails'
import Create from './components/Create'
import FriendsList from './components/FriendsList'
import GuestList from './components/GuestsAndInvites'
import EventUpdate from './components/EventUpdate'
import EventMap from './components/EventMap';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div className = 'App'>
    <EventUpdate />
    <Router history={browserHistory}>
      <Route path='/' component={Home} />
      <Route path='/create' component={Create} />
      <Route path='/guestList' component={GuestList}/>
      <Route path='/FriendsList' component={FriendsList}/>
      <Route path='/map' component={EventMap} />
      <Route path='/:eventId' component={EventDetails} />
    </Router>
    
    </div>
  </Provider>
  ,document.getElementById('root'));
