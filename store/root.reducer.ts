// ** RTK Query APIs

import { imageManagementApi } from "@/services/image/image.service";
import { combineReducers } from "@reduxjs/toolkit";
// Combine reducers
const rootReducer = combineReducers({
  // rtk queries
  [imageManagementApi.reducerPath]: imageManagementApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
