
import React, { useEffect } from 'react'
import Style from './style.module.css'
function MyAppointments() {
  

  useEffect(()=>{

  },[])
  return (
    <>
    <div className={Style.container}>
      
    <table className={Style.table}>
  <tr className={Style.tr}>
    <th>מספר מזהה</th>
    <th>שם הספר</th>
    <th>עיר</th>
    <th>תאריך הפגישה</th>
    <th>פגישה  </th>
  </tr>

  <tr className={Style.tr}>
    <td>מספר מזהה</td>
    <td>שם הספר</td>
    <td>עיר</td>
    <td>תאריך הפגישה</td>
    <td>פגישה  </td>
  </tr>
</table>
    </div>

    </>
  )
}

export default MyAppointments