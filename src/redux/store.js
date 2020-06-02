import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middlewaresToApply = [thunk]

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(...middlewaresToApply),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(...middlewaresToApply)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
