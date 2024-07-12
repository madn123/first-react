import { configureStore } from '@reduxjs/toolkit';
import viewTypeMainReducer from './reducers/viewType';
import dataReducer from './reducers/data';

export const store = configureStore({
  reducer: {
    viewTypeMain: viewTypeMainReducer,
    dataReducer: dataReducer,
  },
})