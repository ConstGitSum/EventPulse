import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import App from './components/App'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class Index extends React.Component {
  render() {
    return(
      <div>
        <App />
      </div>
    );
  }
}

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
    <Index />
	</Provider>
  ,document.getElementById('root'));
