import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';
import transactionReducer from './data/transactionSlice';
import dataReducer from './data/dataSlice';
import typeReducer from './data/typeSlice';
import userReducer from './data/userSlice';
import { fetchUsers } from './data/actions';

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: createDriver(axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  }),),
});

const rootReducer = combineReducers({
  requests: requestsReducer,
  transaction: transactionReducer,
  data: dataReducer,
  type: typeReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...requestsMiddleware),
});

store.dispatch(fetchUsers());

export default store;

// https://redux-requests.klisiczynski.com/docs/introduction/basic-usage