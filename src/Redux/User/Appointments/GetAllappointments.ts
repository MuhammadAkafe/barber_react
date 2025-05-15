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
    async ({userid}:{userid:number},thunkAPI) => {
        try {
            const response = await apiInstance.get(`/GetUserAppointments`,{
              params: {
                userid,
              }
            });
            console.log('API Response:', response.data);
            return response.data;
        } 
        catch (error: any) 
        {
            console.error('API Error:', error.response.data);
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
                state.error = action.payload?.message || 'Unknown error occurred';
            });
    },
});


export default getallappointmentSlice.reducer;