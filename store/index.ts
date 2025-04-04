import { configureStore } from "@reduxjs/toolkit";

import rootReducer, { RootState } from "./root.reducer";
import { imageManagementApi } from "@/services/image/image.service";

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(imageManagementApi.middleware),
});

// Define types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type StoreState = RootState;
