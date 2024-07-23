import { configureStore } from '@reduxjs/toolkit';
import transcationReducer from './data/transactionSlice';
import dataReducer from './data/dataSlice';
import typeReducer from './data/typeSlice';
import userReducer from './data/userSlice';

export const store = configureStore({
  reducer: {
    transaction: transcationReducer,
    data: dataReducer,
    type: typeReducer,
    user: userReducer,
  },
})