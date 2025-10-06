import { configureStore } from '@reduxjs/toolkit';
import { slotsApi } from './api/slotsApi';
import { appointmentsApi } from './api/appointmentsApi'; 
import { donationFormApi } from './api/donationFormApi';
import { healthVitalsApi } from './api/healthVitalsApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      // Add your other reducers here
      [slotsApi.reducerPath]: slotsApi.reducer,
      [appointmentsApi.reducerPath]: appointmentsApi.reducer,  
      [donationFormApi.reducerPath]: donationFormApi.reducer, 
      [healthVitalsApi.reducerPath]: healthVitalsApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(slotsApi.middleware)
        .concat(appointmentsApi.middleware)
        .concat(donationFormApi.middleware)
        .concat(healthVitalsApi.middleware),  
  });

// Export types for usage elsewhere
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
