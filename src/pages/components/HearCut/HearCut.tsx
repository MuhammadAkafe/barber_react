import React from 'react'
import { Props } from '../../../interfaces/AppointmentData'
import Style from './HearCut.module.css'

function HearCut({ formdata, handleSelectionChange }: Props): JSX.Element {
  return (
    <select
    name="roleFor"
    value={formdata.role_for}
    onChange={handleSelectionChange}
    className={Style.rolefor}
  >
    <option value="תספורת">תספורת</option>
    <option value="זקן">זקן</option>
  </select>
  )
}

export default HearCut