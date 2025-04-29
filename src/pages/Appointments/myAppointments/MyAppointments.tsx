
import React, { useEffect, useState } from 'react'
import Style from './style.module.css'
import { useAppDispatch,useAppSelector } from '../../../hooks/hooks'
import { format } from 'date-fns';
import { GetallappointmentApi } from '../../../Redux/User/GetAllappointments';
import { GetAppointments } from '../../../interfaces/AppointmentData';
import { jwtDecode } from 'jwt-decode';

function MyAppointments() {
  const dispatch=useAppDispatch();
  const { data,access_token } = useAppSelector((state) => state.loginSlice);
  const [Appointments,setAppointment]=useState<Array<GetAppointments> | []>([]);
  const userId = data?.payload.UserID;
  const decoded = access_token ? jwtDecode(access_token) : null;
  console.log(access_token);
  useEffect(() => {
    const fetch_data = async () => {
      if (userId) {
        const { payload } = await dispatch(GetallappointmentApi(userId));
        if(payload){
          setAppointment(payload);
        }
        else{
          setAppointment([]); 
        }
      }
    };
    fetch_data();
  }, [userId, dispatch]);
  


  return (
    <>
      <div className={Style.container}>

        <table className={Style.table}>
          <thead>
            <tr className={Style.tr}>
              <th>מספר מזהה</th>
              <th>שם </th>
              <th>ספר</th>
              <th>תאריך הפגישה</th>
              <th>פגישה  </th>
            </tr>
          </thead>
          <tbody>
  {Appointments?.length > 0 ? (
    Appointments.map((Appointment, index) => (
      <tr key={index} className={Style.tr}>
        <td>{Appointment.appointment_id}</td>
        <td>{Appointment.username}</td>
        <td>{Appointment.barber}</td>
        <td>{format(new Date(Appointment.slot_date), 'MM/dd/yy HH:mm')}</td>
        <td>{Appointment.rolefor}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5}>אין פגישות זמינות</td>
    </tr>
  )}
</tbody>


        </table>
      </div>

    </>
  )
}

export default MyAppointments