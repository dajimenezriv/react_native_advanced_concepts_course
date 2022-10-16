import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from './reducers/auth';
import jobs from './reducers/jobs';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedAuth = persistReducer(persistConfig, auth);
const persistedJobs = persistReducer(persistConfig, jobs);

const store = configureStore({
  reducer: {
    auth: persistedAuth,
    jobs: persistedJobs,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
