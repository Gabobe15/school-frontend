// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import users from './users'

export const store = configureStore({
  reducer: {
    users,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>