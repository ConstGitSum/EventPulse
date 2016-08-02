import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import Home from './components/Home'
import EventDetails from './components/EventDetails'
import EventCreate from './components/EventCreate'
import EventList from './components/EventList'


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/create" component={EventCreate} />
      <Route path="/eventList" component={EventList} />
      <Route path="/:eventId" component={EventDetails} />
    </Router>
  </Provider>
  ,document.getElementById('root'));
