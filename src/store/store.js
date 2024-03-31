// src/store.js
import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from '../reducers'; // This combines all your reducers

export const store = createStore(rootReducer, applyMiddleware(thunk));
