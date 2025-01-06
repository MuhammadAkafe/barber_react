import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login"
import RegisterSlice from "../Redux/register"
export const store = configureStore({
  reducer: {
     login:loginSlice, 
     Register:RegisterSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

