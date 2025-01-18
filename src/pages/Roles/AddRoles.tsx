import Style from './styles.module.css';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { cites } from '../cites/israelcites';
import { useAppSelector } from '../../hooks/hooks';

interface roledata {
  id: string;
  date?: string;
  userID: string;
  phonenumber: string;
  city?: string;
  barber?: string;
}

function Roles() {
  let i=0;
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [Role_from_data, setValue] = useState<Partial<roledata>>({
    city: 'טירה', // Default city
    barber: 'חאזם', // Default barber
    date: selectedDate?.format('D/M/YYYY HH:mm'), // Default date
  });
  const { data } = useAppSelector((state) => state.login);

  const handleAccept = (newValue: Dayjs | null) => {
    if (newValue) {
      setValue({ ...Role_from_data, date: newValue.format('D/M/YYYY HH:mm') });
      setSelectedDate(newValue);
    }
  };

  const handleselectionchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue({ ...Role_from_data, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Role_from_data);
  };

  return (
    <div className={Style.container}>
      <form className={Style.form} onSubmit={handlesubmit}>
        <div className={`${Style.text}`}>הוספת תור</div>

        {/* City Selection */}
        <div className={`${Style.text}`}>עיר</div>
        <select
          className={`${Style.cites}`}
          name="city"
          value={Role_from_data.city}
          onChange={handleselectionchange}
        >
          {cites.map((city) => (
            <option key={i++}  value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        {/* Barber Selection */}
        <div className={`${Style.text}`}>סַפָּר</div>
        <select
          className={`${Style.cites}`}
          name="barber"
          value={Role_from_data.barber}
          onChange={handleselectionchange}
        >
          <option value="חאזם">חאזם</option>
          <option value="מוחמד">מוחמד</option>
          <option value="אחמד">אחמד</option>
        </select>

        {/* Date Selection */}
        <div className={`${Style.text}`}>תאריך</div>
        <DateTimePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
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
