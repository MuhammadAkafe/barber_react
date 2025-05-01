// features/dataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import DataState from '../../interfaces/datastate';
import apiInstance from '../../interfaces/axiosInstance';
import { LoginPayload } from '../../interfaces/Auth';



// Initial state
const initialState: DataState = 
{
    data:null,
    access_token:null,
    loading: false,
    error: null 
};


// Thunk action for fetching data
export const fetchLoginData  = createAsyncThunk('login/fetchData', async (login:LoginPayload, { rejectWithValue }) => 
  {
    try {
        const action = await apiInstance.post(`/Login`,login);
        return action.data;
    } 
catch (error: any) 
{
  if (axios.isAxiosError(error) && error.response) 
    {
    return rejectWithValue(error.response?.data);
  }
  return rejectWithValue({ message: error.message || 'Unknown error occurred' });
}
});



// Slice
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      resetState: (state) => {
          state.data = null;
          state.error = null;
          state.loading = false;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchLoginData.pending, (state) => {
          state.loading= true;
          state.data =null;
          state.error = null;
        })
        .addCase(fetchLoginData.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
          state.access_token = action.payload.access_token;
          state.error = null;
        })
        .addCase(fetchLoginData.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = null;
          state.access_token = null;
          state.error = (action.payload?.message || 'An error occurred');
        });
    },
});

export const { resetState } = loginSlice.actions;
export default loginSlice.reducer;
