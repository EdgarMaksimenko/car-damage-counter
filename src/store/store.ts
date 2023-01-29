import { configureStore } from "@reduxjs/toolkit";
import totalReducer from "./slices/totalSlice";
import totalCustomReducer from './slices/totalCustomSlice';


const store = configureStore({
  reducer: {
    totalList: totalReducer,
    totalCustomList: totalCustomReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;