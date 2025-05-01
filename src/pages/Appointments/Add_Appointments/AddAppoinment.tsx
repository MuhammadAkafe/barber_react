import { useState, useCallback } from 'react';
import  { Dayjs } from 'dayjs';
import Style from './styles.module.css';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Citys from '../../components/cites/Citys';
import Barber from '../../components/barber/barber';
import RoleFor from '../../components/Role_for/Role_for';

import Add_Appointment from '../../../interfaces/AppointmentData';
import { addAppointmentapi } from '../../../Redux/User/AddAppointment';

function AddAppointment() {
  const { data } = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Add_Appointment>({
    user_id: data?.payload.UserID ?? null,
    slot_date: null,
    phone_number: data?.payload.Phonenumber ?? null,
    user_name: data?.payload.UserName ?? null,
    city: 'טירה',
    barber: 'חאזם',
    role_for: 'תספורית',
  });

  const handleDateChange = useCallback((datetime: Dayjs | null) => 
    {
    setFormData((prev) => ({ ...prev, slot_date: datetime }));
  }, []);

  const handleSelectionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => 
      {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => 
    {
    e.preventDefault();

    if (!formData.slot_date) 
      {
      alert('אנא בחר תאריך ושעה');
      return;
    }
    try {
      const action=await dispatch(addAppointmentapi(formData));
      console.log(action);
    } 
    catch (error) 
    {
      console.error('Unexpected error:', error);
      alert('אירעה שגיאה בלתי צפויה. אנא נסה שוב.');
    }
  };

  return (
    <div className={Style.container}>
      <form className={Style.form} onSubmit={handleSubmit}>
        <h3 className={Style.text}>הוספת תור</h3>

        <label className={Style.text}>עיר</label>
        <Citys formdata={formData} handleSelectionChange={handleSelectionChange} />

        <label className={Style.text}>סַפָּר</label>
        <Barber formdata={formData} handleSelectionChange={handleSelectionChange} />

        <label className={Style.text}>תפקיד</label>
        <RoleFor formdata={formData} handleSelectionChange={handleSelectionChange} />

        <label className={Style.text}>תאריך ושעה</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
  value={formData.slot_date}
  onChange={handleDateChange}
  ampm={false}
  slotProps={{
    textField: {
      fullWidth: true,
      sx: {
        '& .MuiOutlinedInput-root': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none', // This removes the outline
        },
        '& .MuiInputAdornment-root .MuiIconButton-root': {
          backgroundColor: '#1F2937',
          color: '#fff',
        },
      },
    },
  }}
/>

</LocalizationProvider>


        <button type="submit" className="btn btn-primary">
          הוספה תור
        </button>
      </form>
    </div>
  );
}

export default AddAppointment;
