import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import routes from './routes'
import shareApp from './reducers'

//let store = createStore(shareApp)
const middleware = routerMiddleware(browserHistory)
let store = createStore(
  shareApp,
  applyMiddleware(
		middleware,
		thunkMiddleware
	)
)

render(
	<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
	</Provider>,
  document.getElementById('root')
)
