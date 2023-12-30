import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import hotelsReducer from "./hotelsSlice"
import logReducer from "./logSlice"
import logsReducer from "./logsSlice"

export const store = configureStore({
  reducer: {
    "auth":authReducer,
    "log":logReducer,
    "logs":logsReducer,
    "hotels":hotelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false, 
  }),
})