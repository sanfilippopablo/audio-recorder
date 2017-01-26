import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import App from './App';
import reducer from './redux'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
let store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
