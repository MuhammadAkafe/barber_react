// features/dataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiInstance } from '../../../interfaces/axiosInstance';

type Role= "user" | "admin" | "barber";



interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  phonenumber: string;
  confirm_password: string;
  role: Role;
}

interface DataState 
{
  data: any;
  loading: boolean;
  error: string | null;
}

interface ActionPayloadResponse
{
  message: string;
  userid:string;
}

// Initial state
const initialState: DataState = 
{
  data:null,
  loading: false,
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
  reducers:
   {
    resetState: (state) => {
        state.data = null;
        state.error = null;
        state.loading = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterData.pending, (state) => {
        state.loading= true;
        state.data =null;
        state.error = null;
      })
      .addCase(fetchRegisterData.fulfilled, (state, action: PayloadAction<ActionPayloadResponse>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchRegisterData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload?.message || 'An error occurred';
      });
  },
});


export const { resetState } = RegisterSlice.actions;
export default RegisterSlice.reducer;
