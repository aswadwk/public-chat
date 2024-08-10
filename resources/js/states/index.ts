
import { configureStore } from "@reduxjs/toolkit";
import breadcrumbSlice from "./breadcrumb/breadcrumbSlice";

const store = configureStore({
  reducer: {
    breadcrumb: breadcrumbSlice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
