import { configureStore,combineReducers } from "@reduxjs/toolkit";
import AuthReducer from './AuthReducer'
import DataReducer from './DataReducer'
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig ={
  key:"root",
  storage,
  whitelist:['auth']
};

const rootReducer = combineReducers({
  auth:AuthReducer,
  data:DataReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persist = persistStore(store);
