import { createStore, compose, applyMiddleware } from 'redux'
import { rootReducer } from './reducer'
import ReduxThunk from 'redux-thunk'

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...[ReduxThunk]))
)
window.store = store
