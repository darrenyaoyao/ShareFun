import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import {routerMiddleware} from 'react-router-redux'
import routes from './routes'
import shareApp from './reducers'

//let store = createStore(shareApp)
const middleware = routerMiddleware(browserHistory)
let store = createStore(
  shareApp,
  applyMiddleware(middleware)
)

render(
	<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
	</Provider>,
  document.getElementById('root')
)
