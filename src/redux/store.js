import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers/reducer';

const middleWares = [thunk, logger];

const store = createStore(reducer, applyMiddleware(...middleWares));

export default store;
