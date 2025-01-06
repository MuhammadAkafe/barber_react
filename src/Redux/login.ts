// features/dataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import DataState from '../interfaces/datastate';



interface LoginPayload {
    email: string;
    password: string;
}

// Initial state
const initialState: DataState = {
    data:null,
    successMessage:false,
    loading: false,
    error: null,
};

// Thunk action for fetching data
export const fetchLoginData  = createAsyncThunk('login/fetchData', async (login:LoginPayload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/Login`,login,{
            withCredentials:true
        });
        return response.data;
    } 
catch (error: any) 
{
  if (axios.isAxiosError(error) && error.response) {
    // Backend responded with an error
    return rejectWithValue(error.response.data);
  }
  // Other errors (e.g., network issues)
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
          state.successMessage=false;
          state.error = null;
          state.loading = false;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchLoginData.pending, (state) => {
          state.loading= true;
          state.data =null;
          state.successMessage=false;
          state.error = null;
        })
        .addCase(fetchLoginData.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
          state.successMessage=true
          state.error = null;
        })
        .addCase(fetchLoginData.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.successMessage=false;
          state.data = null;
          state.error = action.payload?.message || 'An error occurred';
        });
    },
});

export const { resetState } = loginSlice.actions;
export default loginSlice.reducer;
