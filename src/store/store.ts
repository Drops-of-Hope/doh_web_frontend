import { configureStore } from '@reduxjs/toolkit';
import { slotsApi } from './api/slotsApi'; 

export const makeStore = () =>
  configureStore({
    reducer: {
      // Add your other reducers here
      [slotsApi.reducerPath]: slotsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(slotsApi.middleware),
  });

// Export types for usage elsewhere
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
