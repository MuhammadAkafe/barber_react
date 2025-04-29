import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import apiInstance from '../../interfaces/axiosInstance';
import { GetAppointments } from '../../interfaces/AppointmentData';



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



export const GetallappointmentApi = createAsyncThunk(
    'getallappointmentSlice/GetallAppointments',
    async (user_id :string | number, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get('/GetallAppointments',{
                params:{
                    user_id
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



export const getallappointmentSlice = createSlice({
    name: 'getallappointmentSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetallappointmentApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetallappointmentApi.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.appointments=action.payload.appointments
                state.error = null;
            })
            .addCase(GetallappointmentApi.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.appointments=null
                state.error = action.payload.message;
            });
    },
});


export default getallappointmentSlice.reducer;