import React from 'react'
import { Props } from '../../../interfaces/AppointmentData'
import  Style  from './Role_for.module.css'


function Role_For({ formdata, handleSelectionChange }: Props): JSX.Element {
  return (
    <select
    name="role_for"
    value={formdata.role_for}
    onChange={handleSelectionChange}
    className={Style.rolefor}
  >
    <option value="תספורת">תספורת</option>
    <option value="זקן">זקן</option>
  </select>
  )
}

export default Role_For