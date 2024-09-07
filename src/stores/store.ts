import { configureStore } from '@reduxjs/toolkit'
import { authApiSlice, dataApiSlice } from '@/api'

export const store = configureStore({
  reducer: {
    [dataApiSlice.reducerPath]: dataApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataApiSlice.middleware, authApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
