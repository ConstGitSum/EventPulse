import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import Home from './components/Home'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class Index extends React.Component {
  render() {
    return(
      <div>
        <Home />
      </div>
    );
  }
}

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
    <Index />
	</Provider>
  ,document.getElementById('root'));
