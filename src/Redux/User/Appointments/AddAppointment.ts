import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from "../../Store";
import apiInstance from '../../../interfaces/axiosInstance';
import  Add_Appointment  from '../../../interfaces/AppointmentData';


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

export const AddAppointmentApi = createAsyncThunk(
    'appointments/AddAppointment',
    async (appointmentData: Add_Appointment, { rejectWithValue }) => {
        try {
            const response = await apiInstance.post('/AddAppointment', appointmentData);
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

export const AddappointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddAppointmentApi.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message=null
            })
            .addCase(AddAppointmentApi.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
                state.message=action.payload.message;
            })
            .addCase(AddAppointmentApi.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
                state.message=null
            });
    },
});




export default AddappointmentSlice.reducer;