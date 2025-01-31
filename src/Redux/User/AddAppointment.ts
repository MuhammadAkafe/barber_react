import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from "../../Redux/Store";
import apiInstance from '../../interfaces/axiosInstance';
import  AppointmentData  from '../../interfaces/AppointmentData';


interface initialState {
    appointments: Array<AppointmentData>
    loading: boolean;
    error: string | null;
}

const initialState: initialState = {
    appointments: [],
    loading: false,
    error: null,
};

export const addAppointmentapi = createAsyncThunk(
    'appointments/AddAppointment',
    async (appointmentData: AppointmentData, { rejectWithValue }) => {
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

export const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAppointmentapi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAppointmentapi.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.appointments=action.payload.appointments;
            })
            .addCase(addAppointmentapi.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export const selectAppointments = (state: RootState) => state.appointmentSlice.appointments;
export const selectLoading = (state: RootState) => state.appointmentSlice.loading;
export const selectError = (state: RootState) => state.appointmentSlice.error;

export default appointmentSlice.reducer;