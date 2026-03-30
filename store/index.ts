import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import { authMiddleware } from "./middlewares/authMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultmiddleware) =>
    getDefaultmiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
