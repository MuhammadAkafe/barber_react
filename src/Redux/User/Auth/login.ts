// features/dataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import apiInstance from '../../../interfaces/axiosInstance';
import { LoginPayload } from '../../../interfaces/Auth';


interface DataState {
  data: any;
  loading: boolean;
  error: string | null;
}
interface Data 
{
UserID: string; 
Phonenumber: string; 
UserName: string; 
UserRole: string;
}

interface ActionResponse {
  message: string;
  data:Data
  access_token: string;
}




// Initial state
const initialState: DataState = 
{
    data:null,
    loading: false,
    error: null 
};


// Thunk action for fetching data
export const fetchLoginData  = createAsyncThunk('login/fetchData', async (login:LoginPayload, { rejectWithValue }) => 
  {
    try {
        const action = await apiInstance.post<ActionResponse>(`/auth/Login`,login);
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
        setAccessToken: (state, action: PayloadAction<ActionResponse>) => {
          state.data.access_token = action.payload.access_token;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchLoginData.pending, (state) => {
          state.loading= true;
          state.data =null;
          state.error = null;
        })
        .addCase(fetchLoginData.fulfilled, (state, action: PayloadAction<ActionResponse>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        })
        .addCase(fetchLoginData.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
          state.error = action.payload ? (action.payload as { message: string }).message : 'An error occurred';
        });
    },
});

export const { resetState, setAccessToken } = loginSlice.actions;
export default loginSlice.reducer;
