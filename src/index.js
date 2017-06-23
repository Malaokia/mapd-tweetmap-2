import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './containers/App'
import $ from 'jquery'

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// needed for mapbox
require("script-loader!mapbox-gl/dist/mapbox-gl.js");
require("script-loader!mapbox-gl/dist/mapboxgl-overrides.js");

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
