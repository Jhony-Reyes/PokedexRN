/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-19 22:16:48
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-20 00:43:26
 */

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
