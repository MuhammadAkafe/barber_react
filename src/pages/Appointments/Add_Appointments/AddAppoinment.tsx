import Style from './styles.module.css';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Citys from '../../components/cites/Citys';
import  AppointmentData  from '../../../interfaces/AppointmentData';
import Barber from '../../components/barber/barber';
import HearCut from '../../components/HearCut/HearCut';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { addAppointmentapi } from '../../../Redux/User/AddAppointment';
import { ErrorHandling } from '../../components/Errorhandling/Error';


function AddAppoinment() 
{
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const { data } = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [formData, setFormData] = useState<AppointmentData>(
    {
    user_id: data?.payload.UserID ?? null,
    slot_date: selectedDate,
    phone_number: data?.payload.Phonenumber ?? null,
    user_name: data?.payload.UserName ?? null,
    city: 'טירה',
    barber: 'חאזם',
    role_for: 'תספורת',
  });

  const opening=dayjs('11:00', 'HH:mm');
  const closing=dayjs('23:00', 'HH:mm');


  useEffect(()=>{
  },[])




  const handleAccept = useCallback((datetime: Dayjs | null) => {
    if (datetime) {
      setFormData((prev) => ({ ...prev, slot_date: datetime.format('YYYY-MM-DD HH:mm') }));
      setSelectedDate(datetime);
    }
  }, []);

  const handleSelectionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => 
    {
    e.preventDefault();
    if (!formData.slot_date) {
      alert('Please select date');
      return;
    }
    const action = await dispatch(addAppointmentapi(formData));
    const isError=ErrorHandling(action,addAppointmentapi);



    if(isError)
      {
      return;
      }
    
  }, [formData]);


  interface DisableTimeParams {
    timeValue: Dayjs;
    clockType: 'hours' | 'minutes';
  }

  const handledisapleTime = ({ timeValue, clockType }: DisableTimeParams): boolean => {

    const now = dayjs();
    if (selectedDate && selectedDate.isSame(now, 'day')) 
      {
      if (clockType === 'hours') 
        {
        return timeValue.hour() < now.hour();
      }
      if (clockType === 'minutes') 
        {
        return timeValue.minute() < now.minute();
      }


      }
   return false;
  }



  return (
    <div className={Style.container}>
      <form className={Style.form} onSubmit={handleSubmit}>
        <div className={`${Style.text}`}>הוספת תור</div>

        <div className={`${Style.text}`}>עיר</div>
        <Citys formdata={formData} handleSelectionChange={handleSelectionChange} />

        <div className={`${Style.text}`}>סַפָּר</div>
        <Barber formdata={formData} handleSelectionChange={handleSelectionChange} />


        <div className={`${Style.text}`}>תפקיד</div>
        <HearCut formdata={formData} handleSelectionChange={handleSelectionChange} />

        <div className={`${Style.text}`}>תאריך</div>
        <DateTimePicker
          onChange={(newValue) => newValue && setSelectedDate(newValue)}
          onAccept={handleAccept}
          minutesStep={15}
          minTime={opening}
          maxTime={closing}
          ampm={false}
          disablePast
          shouldDisableTime={() => handledisapleTime({ timeValue: dayjs(), clockType: 'hours' })}
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
