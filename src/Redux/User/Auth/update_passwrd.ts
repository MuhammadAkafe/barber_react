// features/dataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { apiInstance } from '../../../interfaces/axiosInstance';

// Extended state interface to include phone number

// Async thunk for sending verification code

interface DataState 
{
    data: any;
    loading: boolean;
    error: string | null;
}

interface UpdatePasswordPayload {
    email: string;
    newPassword: string;
    confirmPassword: string;
}

const initialState: DataState = 
{
  data:null,
  loading: false,
  error: null,
};

export const update_password_Api = createAsyncThunk(
    'update_password/updatepassword',
    async (payload: UpdatePasswordPayload, {rejectWithValue }) => {
        try {
            const response = await apiInstance.post('/auth/updatepassword', payload);
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



// Slice with improved state management
const updatepasswordSlice = createSlice({
    name: 'update_password',
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
            // Handle sendVerificationCodeapi
            .addCase(update_password_Api.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = null;
            })
            .addCase(update_password_Api.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(update_password_Api.rejected, (state, action:any) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload?.message || 'Failed to send verification code';
            })
    },
});

export const { resetState } = updatepasswordSlice.actions;
export default updatepasswordSlice.reducer;
