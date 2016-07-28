import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

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
