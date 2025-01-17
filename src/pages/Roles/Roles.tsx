import Style from './styles.module.css';
import { DateTimePicker, DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { cites } from '../cites/israelcites';
function Roles() {
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  const handleAccept = (value: Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => {
    setValue((value) => value)
    console.log(value?.format('D/M/YYYY HH:mm'));
  };

  return (


    <div className={Style.container}>
<form className={Style.form}>
  <div className={Style.Addrole}>הוספת תור</div>
  <div className={Style.datefield}>
    <DateTimePicker
    defaultValue={dayjs()}
      minutesStep={15}
      ampm={false}
      value={value}
      onAccept={handleAccept}
    />
  </div>
  <select className={`${Style.cites}`}>
  {cites.map((city) => (
    <option  value={city.name} selected={city.name === 'טירה'}>
      {city.name}
    </option>
  ))}
</select>

</form>


    </div>
  );
}

export default Roles;
