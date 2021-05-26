import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { createStore , applyMiddleware, compose ,combineReducers } from 'redux';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk'

import reducer from './store/reducers/reducer';
import orderreducer from './store/reducers/order';

const rootreducer = combineReducers({
  burgerbuilder:reducer,
  order:orderreducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootreducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
