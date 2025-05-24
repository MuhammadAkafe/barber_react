// features/dataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { apiInstance } from '../../../interfaces/axiosInstance';


interface DataState 
{
    data: any;
    loading: boolean;
    error: string | null;
}

interface ActionResponse
{
    userid: string;
    message: string;
    sid: string;
    expiresIn: number;
}

interface ErrorResponse
{
    message: string;
}




// Initial state with phone number
const initialState: DataState = {
    data: null,
    loading: false,
    error: null,
};



// Async thunk for sending verification code
export const sendVerificationCodeapi = createAsyncThunk(
    'phonenumber/sendVerificationCode',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await apiInstance.post('/auth/sendVerificationCode', {
               email
            });
            return response.data;
        } 
        catch (error: any) {
            if (axios.isAxiosError(error) && error.response) 
                {
                return rejectWithValue(error.response?.data);
              }
              return rejectWithValue({ message: error.message || 'Unknown error occurred' });
        }
    }
);

// Async thunk for verifying code
export const verify_code = createAsyncThunk
(
    'phonenumber/verify_code',
    async (payload: { code: string, email: string}, {  rejectWithValue }) => {
        try {
            const response = await apiInstance.post('/auth/verifycode', {
                code: payload.code,
                email: payload.email
            });
            return response.data;
        } catch (error: any) 
        {
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
const sendVerificationCodeSlice = createSlice({
    name: 'phonenumber',
    initialState,
    reducers: {
        resetState: (state) => {
            state.data = null;
            state.error = null;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        setUserid: (state, action: PayloadAction<ActionResponse>) => {
            state.data.userid = action.payload.userid;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle sendVerificationCodeapi
            .addCase(sendVerificationCodeapi.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = null;
            })
            .addCase(sendVerificationCodeapi.fulfilled, (state, action: PayloadAction<ActionResponse>) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(sendVerificationCodeapi.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = (action.payload as ErrorResponse)?.message || 'Failed to send verification code';
            })
            // Handle verify_code
            .addCase(verify_code.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = null;
            })
            .addCase(verify_code.fulfilled, (state, action: PayloadAction<ActionResponse>) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(verify_code.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = (action.payload as ErrorResponse)?.message || 'Failed to verify code';
            });
    },
});

export const { resetState, clearError, setUserid: setPhoneNumber } = sendVerificationCodeSlice.actions;
export default sendVerificationCodeSlice.reducer;
