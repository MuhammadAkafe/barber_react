import Style from './styles.module.css';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useCallback } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import axios from 'axios';
import  Citys  from '../components/cites/Citys';
import RoleData from '../../interfaces/formdata';
import Barber from '../components/barber/barber';
import HearCut from '../components/HearCut/HearCut';


function Roles() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const { data } = useAppSelector((state) => state.login);
  const [formData, setFormData] = useState<RoleData>({
    userID: data?.userID ?? '',
    date: selectedDate,
    phoneNumber: data?.phoneNumber ?? '',
    userName: data?.userName ?? '',
    city: 'טירה',
    barber: 'חאזם',
    roleFor: 'תספורת',
  });

  const handleAccept = useCallback((datetime: Dayjs | null) => {
    if (datetime) {
      setFormData((prev) => ({ ...prev, date: datetime?.format('YYYY-MM-DD HH:mm') }));
      setSelectedDate(datetime);
    }
  }, []);

  const handleSelectionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!formData.date){
      alert('Please select date');
      return;
    }
    axios.post('http://localhost:5000/AddRole', formData)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
      console.log(formData);
  }, [formData]);



  return (
    <div className={Style.container}>
      <form className={Style.form} onSubmit={handleSubmit}>
        <div className={`${Style.text}`}>הוספת תור</div>

        <div className={`${Style.text}`}>עיר</div>
        <Citys formdata={formData} handleSelectionChange={handleSelectionChange}  />

        <div className={`${Style.text}`}>סַפָּר</div>
        <Barber formdata={formData} handleSelectionChange={handleSelectionChange} />


        <div className={`${Style.text}`}>תפקיד</div>
        <HearCut formdata={formData} handleSelectionChange={handleSelectionChange} />

        <div className={`${Style.text}`}>תאריך</div>
        <DateTimePicker
          onChange={(newValue) => newValue && setSelectedDate(newValue)}
          onAccept={handleAccept}
          minutesStep={15}
          ampm={false}
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

export default Roles;
