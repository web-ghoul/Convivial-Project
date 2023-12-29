import { configureStore } from '@reduxjs/toolkit'
import hotelsReducer from "./hotelsSlice"
import logReducer from "./logSlice"
import logsReducer from "./logsSlice"

export const store = configureStore({
  reducer: {
    "log":logReducer,
    "logs":logsReducer,
    "hotels":hotelsReducer,
  },
})