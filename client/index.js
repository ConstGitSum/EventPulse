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

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/create" component={Create} />
      <Route path="/FriendsList" component={FriendsList}/>
      <Route path="/:eventId" component={EventDetails} />
    </Router>
  </Provider>
  ,document.getElementById('root'));
