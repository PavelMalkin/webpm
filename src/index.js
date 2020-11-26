import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { createStore } from 'redux';
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers/rootReducer';

function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      // console.log(action);
      return next(action);
    }
  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), loggerMiddleware]
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
