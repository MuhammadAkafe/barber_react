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

interface ErrorResponse {
    message: string;
    status?: number;
}

interface UpdatePasswordPayload {
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
    async (payload: UpdatePasswordPayload, {getState, rejectWithValue }) => {
        try {
            const response = await apiInstance.post('/updatepassword', payload);
            return response.data;
        }
         catch (error) {
            if (axios.isAxiosError(error)) 
                {
                const axiosError = error as AxiosError<ErrorResponse>;
                return rejectWithValue({
                    message: axiosError.response?.data?.message || 'Failed to send verification code',
                    status: axiosError.response?.status
                });
            }
            return rejectWithValue({
                message: 'An unexpected error occurred'
            });
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
