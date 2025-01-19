import React from 'react'
import { Props } from '../../../interfaces/formdata'
import Style from './HearCut.module.css'

function HearCut({ formdata, handleSelectionChange }: Props): JSX.Element {
  return (
    <select
    name="roleFor"
    value={formdata.roleFor}
    onChange={handleSelectionChange}
    className={Style.rolefor}
  >
    <option value="תספורת">תספורת</option>
    <option value="זקן">זקן</option>
  </select>
  )
}

export default HearCut