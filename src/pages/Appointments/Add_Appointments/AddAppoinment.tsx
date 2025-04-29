import Style from './styles.module.css';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Citys from '../../components/cites/Citys';
import  Add_Appointment, { GetAppointments }  from '../../../interfaces/AppointmentData';
import Barber from '../../components/barber/barber';
import Role_For from '../../components/Role_for/Role_for';
import { addAppointmentapi } from '../../../Redux/User/AddAppointment';
import { thunkErrorHandling, ReduxAction } from '../Error_handling/Error';
import { GetallappointmentApi } from '../../../Redux/User/GetAllappointments';
import { format } from 'date-fns';

interface DisableTimeParams {
  timeValue: Dayjs;
  clockType: 'hours' | 'minutes';
}

function AddAppoinment() 
{
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [Appointments, setAppointment] = useState< Array<GetAppointments>| null>(null);
  const { data } = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();
  const userId = data?.payload.UserID;

  const [formData, setFormData] = useState<Add_Appointment>(
    {
    user_id: data?.payload.UserID ?? null,
    slot_date: selectedDate,
    phone_number: data?.payload.Phonenumber ?? null,
    user_name: data?.payload.UserName ?? null,
    city: 'טירה',
    barber: 'חאזם',
    role_for: 'תספורית',
  });


  const handleAccept = (datetime: Dayjs | null) => {
    if (!datetime) {
      console.log(`date time is required ${datetime}`);
      return 
    }

    setFormData((prev) => ({ ...prev, slot_date: datetime }));
    setSelectedDate(datetime);
  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formData.slot_date) {
        alert("Please select a date");
        return;
      }
    
      try {
        const resultAction = await dispatch(addAppointmentapi(formData));
        const message = thunkErrorHandling(resultAction as ReduxAction, addAppointmentapi);
        alert(message);
      } 
      catch (error) {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    };





    const handleDisableTime = () => {
      const slotTimes = Appointments?.map(appointment =>
        dayjs(appointment.slot_date).format('MM/DD/YY HH:mm')
      ) || [];
    
      const fulldate = slotTimes.map(date => date); 
      console.log(fulldate);
    };
    

    // handleDisableTime()




  return (
    <div className={Style.container}>
      <form className={Style.form} onSubmit={handleSubmit}>
        <div className={`${Style.text}`}>הוספת תור</div>

        <div className={`${Style.text}`}>עיר</div>
        <Citys formdata={formData} handleSelectionChange={handleSelectionChange} />

        <div className={`${Style.text}`}>סַפָּר</div>
        <Barber formdata={formData} handleSelectionChange={handleSelectionChange} />


        <div className={`${Style.text}`}>תפקיד</div>
        <Role_For formdata={formData} handleSelectionChange={handleSelectionChange} />

        <div className={`${Style.text}`}>תאריך</div>
        <DateTimePicker
          onChange={(newValue) => newValue && setSelectedDate(newValue)}
          onAccept={handleAccept}
          ampm={false}
          disablePast
          minutesStep={15}
          sx={{
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '& .MuiSvgIcon-root': { color: 'white' },
          }}
        />

        <button type="submit" className="btn btn-primary">הוספה תור</button>
      </form>
    </div>
  );
}

export default AddAppoinment;
