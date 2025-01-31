import React from 'react'
import Style from './barber.module.css'
import { Props } from '../../../interfaces/AppointmentData';
function Barber({ formdata, handleSelectionChange }: Props): JSX.Element {
  return (
    <select
    className={`${Style.barber}`}
    name="barber"
    value={formdata.barber}
    onChange={handleSelectionChange}
  >
    <option value="חאזם">חאזם</option>
  </select>
  )
}

export default Barber