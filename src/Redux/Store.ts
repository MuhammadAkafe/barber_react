import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Auth/login"
import RegisterSlice from "./Auth/register"
import  AddappointmentSlice  from "./User/AddAppointment"; 
export const store = configureStore({
  reducer: {
     loginSlice, 
     RegisterSlice,
     AddappointmentSlice: AddappointmentSlice,
  },
  //devTools: process.env.NODE_ENV !== 'production',
})

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

