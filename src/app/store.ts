import { configureStore } from "@reduxjs/toolkit";
import { movieApiSlice } from "@/features/movie/movies-api-slice";
import { preferencesApiSlice } from "@/features/preferences/preferences-api-slice";

export const store = configureStore({
  reducer: {
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    [preferencesApiSlice.reducerPath]: preferencesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      movieApiSlice.middleware,
      preferencesApiSlice.middleware,
    ]);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
