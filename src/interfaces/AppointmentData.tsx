import dayjs from 'dayjs';

export default interface AppointmentData {
  user_id: string | null ;
  user_name: string | null ;
  slot_date: dayjs.Dayjs |null | string;
  phone_number: string | null;
  city: string;
  barber: string;
  role_for: string;
}


export interface Props {
    formdata: AppointmentData;
    handleSelectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }