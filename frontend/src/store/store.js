import { configureStore } from '@reduxjs/toolkit'
import hotelsReducer from "./hotelsSlice"
import logsReducer from "./logsSlice"

export const store = configureStore({
  reducer: {
    "logs":logsReducer,
    "hotels":hotelsReducer,
  },
})