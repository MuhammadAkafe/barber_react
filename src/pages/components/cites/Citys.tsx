import React from 'react'
import { cites } from '../../cites/israelcites'
import Style from './Cites.module.css'
import RoleData from '../../../interfaces/formdata';
import { Props } from '../../../interfaces/formdata';


 function Citys({ formdata, handleSelectionChange }: Props): JSX.Element {
  return (
    <select
      className={`${Style.cites}`}
      name="city"
      value={formdata.city}
      onChange={handleSelectionChange}
    >
      {cites.map((city, index) => (
        <option key={index} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  )
}

export default Citys