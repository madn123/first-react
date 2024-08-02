import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';
import transactionReducer from './data/transactionSlice';
import dataReducer from './data/dataSlice';
import typeReducer from './data/typeSlice';
import userReducer from './data/userSlice';
import { fetchUsers } from './data/actions';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: createDriver(axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  }),),
});

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  requests: requestsReducer,
  transaction: transactionReducer,
  data: dataReducer,
  type: typeReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...requestsMiddleware),
});

const persistor = persistStore(store);

store.dispatch(fetchUsers());

export {persistor, store}

// https://redux-requests.klisiczynski.com/docs/introduction/basic-usage