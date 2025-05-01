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
  appointment_id:string | number
  userid: string | number,
  username: string
  phonenumber: string
  barber: string
  slot_date: string
  rolefor: string
}


export interface Props {
    formdata: Add_Appointment;
    handleSelectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }