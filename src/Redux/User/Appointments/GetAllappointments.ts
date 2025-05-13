import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import apiInstance from '../../../interfaces/axiosInstance';
import { GetAppointments } from '../../../interfaces/AppointmentData';



 interface initialState {
    appointments: Array<GetAppointments> | null
    loading: boolean;
    error: string | null;
}

const initialState: initialState = {
    appointments: null,
    loading: false,
    error: null,
};



export const GetUserAppointments_ = createAsyncThunk(
    'getallappointmentSlice/GetallAppointments',
    async (_, thunkAPI) => {
        try {
        const userid = 'someUserId'; // Replace with actual user ID logic
        const offset = 0; // Replace with actual offset logic
        const response = await apiInstance.get(`/GetUserAppointments${userid}${offset}`);
            return response.data;
        } 
        catch (error: any) 
        {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response?.data);
            } else 
            {
                return thunkAPI.rejectWithValue({ message: error.message || 'Unknown error occurred' });
            }
    }
    }
);




export const getallappointmentSlice = createSlice({
    name: 'getallappointmentSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUserAppointments_.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetUserAppointments_.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.appointments=action.payload.appointments
                state.error = null;
            })
            .addCase(GetUserAppointments_.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.appointments=null
                state.error = action.payload.message;
            });
    },
});


export default getallappointmentSlice.reducer;