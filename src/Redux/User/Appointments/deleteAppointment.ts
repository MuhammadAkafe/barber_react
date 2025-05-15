import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import apiInstance from '../../../interfaces/axiosInstance';


interface initialState {
    message: string| null
    loading: boolean;
    error: string | null;
}

const initialState: initialState = {
    message: null,
    loading: false,
    error: null,
};

export const deleteAppointmentApi = createAsyncThunk(
    'deleteappointmentSlice/DeleteAppointment',
    async (appointment_id:number , { rejectWithValue }) => {
        try {
            const response = await apiInstance.delete('/DeleteAppointment', {
                params: {
                    appointment_id
                }
            });
            return response.data;
        } 
        catch (error: any) 
        {
            if (axios.isAxiosError(error) && error.response) 
                {
                // Backend responded with an error
                return rejectWithValue(error.response?.data);
              }
              // Other errors (e.g., network issues)
              return rejectWithValue({ message: error.message || 'Unknown error occurred' });
        }
    }
);

export const deleteappointmentSlice = createSlice({
    name: 'deleteappointmentSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAppointmentApi.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message=null
            })
            .addCase(deleteAppointmentApi.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
                state.message=action.payload.message;
            })
            .addCase(deleteAppointmentApi.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
                state.message=null
            });
    },
});




export default deleteappointmentSlice.reducer;