import dayjs from 'dayjs';

export default interface Add_Appointment {
  user_id: string | null ;
  user_name: string | null ;
  slot_date:dayjs.Dayjs | null | undefined
  phone_number: string | null;
  city: string ;
  barber: string ;
  role_for: string ;
}


export interface GetAppointments {
  userid: string | number,
  barber_id: string | number,
  appointment_id:string | number
  appointment_date: string,
  appointment_time: string,
  city: string,
  phonenumber: string
  rolefor: string
}
