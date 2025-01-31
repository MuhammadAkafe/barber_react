import React from 'react'
import Style from './Cites.module.css'
import { Props } from '../../../interfaces/AppointmentData';


 function Citys({ formdata, handleSelectionChange }: Props): JSX.Element {
  return (
    <select
      className={`${Style.cites}`}
      name="city"
      value={formdata.city}
      onChange={handleSelectionChange}
    >
        <option  value={"טירה"}>
         טירה
        </option>   
    </select>
  )
}

export default Citys