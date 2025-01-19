import React from 'react'
import Style from './barber.module.css'
import { Props } from '../../../interfaces/formdata';
function Barber({ formdata, handleSelectionChange }: Props): JSX.Element {
  return (
    <select
    className={`${Style.barber}`}
    name="barber"
    value={formdata.barber}
    onChange={handleSelectionChange}
  >
    <option value="חאזם">חאזם</option>
    <option value="מוחמד">מוחמד</option>
    <option value="אחמד">אחמד</option>
  </select>
  )
}

export default Barber