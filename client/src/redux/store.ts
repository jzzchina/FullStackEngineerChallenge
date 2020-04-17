
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/RootReducer'

const middlewares = [
    thunk, 
    logger
];

export default createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);
