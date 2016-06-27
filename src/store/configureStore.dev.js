/* eslint global-require: 0 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { persistState } from 'redux-devtools';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const router = routerMiddleware(browserHistory);

/**
 * Creates a preconfigured store.
 */
export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, router, logger),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )
      ),
      autoRehydrate()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
