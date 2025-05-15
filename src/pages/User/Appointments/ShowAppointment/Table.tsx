import React from 'react'
import { 
  IdentificationIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  PhoneIcon, 
  CalendarIcon, 
  ClockIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

function Table({handle_Edit, handleDelete, current_appointments}:
  {handle_Edit: (id: number) => void, handleDelete: (id: number) => void, current_appointments: any[]}):
  React.JSX.Element {
  return (
    <>
    <table className="table table-hover table-striped align-middle">
    <thead className="table-primary">
      <tr>
        <th className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <IdentificationIcon style={{ width: '20px', height: '20px' }} />
            מספר מזהה
          </div>
        </th>
        <th className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <UserIcon style={{ width: '20px', height: '20px' }} />
            ספר
          </div>
        </th>
        <th className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BuildingOfficeIcon style={{ width: '20px', height: '20px' }} />
            עיר
          </div>
        </th>
        <th className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <PhoneIcon style={{ width: '20px', height: '20px' }} />
            מספר טלפון
          </div>
        </th>
        <th className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <CalendarIcon style={{ width: '20px', height: '20px' }} />
            תאריך
          </div>
        </th>
        <th className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ClockIcon style={{ width: '20px', height: '20px' }} />
            שעה
          </div>
        </th>
        <th className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            פעולות
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {current_appointments?.map((appointment) => (
        <tr key={appointment.id}>
          <td className="text-center">{appointment.appointment_id}</td>
          <td className="text-center">{appointment.barber_id}</td>
          <td className="text-center">{appointment.city}</td>
          <td className="text-center">{appointment.phonenumber}</td>
          <td className="text-center">{appointment.appointment_date}</td>
          <td className="text-center">{appointment.appointment_time}</td>
          <td className="text-center">
            <div className="d-flex justify-content-center gap-2">
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => handle_Edit(appointment.appointment_id)}
              >
                <PencilIcon style={{ width: '20px', height: '20px' }} />
              </button>
              <button 
                className="btn btn-sm btn-outline-danger"
              >
                <TrashIcon style={{ width: '20px', height: '20px' }} onClick={() => handleDelete(appointment.appointment_id)} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    </>
  )
}

export default Table