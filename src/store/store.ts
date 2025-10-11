import { configureStore } from '@reduxjs/toolkit';
import { slotsApi } from './api/slotsApi';
import { appointmentsApi } from './api/appointmentsApi'; 
import { donationFormApi } from './api/donationFormApi';
import { healthVitalsApi } from './api/healthVitalsApi';
import { bloodDonationApi } from './api/bloodDonationApi';
import { inventoryApi } from './api/inventoryApi';
import { bloodTestApi } from './api/bloodTestApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      // Add your other reducers here
      [slotsApi.reducerPath]: slotsApi.reducer,
      [appointmentsApi.reducerPath]: appointmentsApi.reducer,  
      [donationFormApi.reducerPath]: donationFormApi.reducer, 
      [healthVitalsApi.reducerPath]: healthVitalsApi.reducer, 
      [bloodDonationApi.reducerPath]: bloodDonationApi.reducer, 
      [inventoryApi.reducerPath]: inventoryApi.reducer, 
      [bloodTestApi.reducerPath]: bloodTestApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(slotsApi.middleware)
        .concat(appointmentsApi.middleware)
        .concat(donationFormApi.middleware)
        .concat(healthVitalsApi.middleware)
        .concat(bloodDonationApi.middleware)
        .concat(inventoryApi.middleware)
        .concat(bloodTestApi.middleware),
  });

// Export types for usage elsewhere
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
