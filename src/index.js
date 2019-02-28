import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/root_reducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </ Provider>, 
    
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
