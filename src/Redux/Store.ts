import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./User/Auth/login"
import RegisterSlice from "./User/Auth/register"
import  AddappointmentSlice  from "./User/Appointments/AddAppointment"; 
import { useDispatch,useSelector,useStore  } from "react-redux";
import { useNavigate,NavigateFunction } from 'react-router-dom';
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





export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
export const useAppNavigate = (): NavigateFunction => useNavigate();
