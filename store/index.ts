import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import ticketReducer from "./tickets/TicketSlice"
import moduleReducer from "./module/ModuleSlice"
import { authMiddleware } from "./middlewares/authMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket:ticketReducer,
    module : moduleReducer
  },
  middleware: (getDefaultmiddleware) =>
    getDefaultmiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
