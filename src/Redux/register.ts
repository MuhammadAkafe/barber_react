// features/dataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import DataState from '../interfaces/datastate';
import { apiInstance } from '../interfaces/axiosInstance';
interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  phonenumber: string;
  confirm_password: string;
  isAdmin: boolean;
}

// Initial state
const initialState: DataState = {
  data:null,
  message:null,
  loading: false,
  successMessage:false,
  error: null,
};

// Async thunk for fetching register data
export const fetchRegisterData = createAsyncThunk(
  'Register/fetchData',
  async (registerPayload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await apiInstance.post(`/Register`, registerPayload);
      return response.data;
    } 
    catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        // Backend responded with an error
        return rejectWithValue(error.response.data);
      }
      // Other errors (e.g., network issues)
      return rejectWithValue({ message: error.message || 'Unknown error occurred' });
    }
  }
);

// Slice
const RegisterSlice = createSlice({
  name: 'Register',
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
      .addCase(fetchRegisterData.pending, (state) => {
        state.loading= true;
        state.data =null;
        state.message=null
        state.successMessage=false;
        state.error = null;
      })
      .addCase(fetchRegisterData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.message=action.payload.message
        state.successMessage=true
        state.error = null;
      })
      .addCase(fetchRegisterData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.successMessage=false;
        state.message=null
        state.data = null;
        state.error = action.payload?.message || 'An error occurred';
      });
  },
});


export const { resetState } = RegisterSlice.actions;
export default RegisterSlice.reducer;
