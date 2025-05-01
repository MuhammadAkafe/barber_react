import React, { useEffect, useState } from 'react';
import Style from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { format } from 'date-fns';
import { GetallappointmentApi } from '../../../Redux/User/GetAllappointments';
import { GetAppointments } from '../../../interfaces/AppointmentData';
import { jwtDecode } from 'jwt-decode';


function MyAppointments() {
  const dispatch = useAppDispatch();
  const { data, access_token } = useAppSelector((state) => state.loginSlice);
  const [appointments, setAppointments] = useState<GetAppointments[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const userId = data?.payload.UserID;
  const decoded = access_token ? jwtDecode(access_token) : null;

  useEffect(() => {
    const fetch_data = async () => {
      if (userId) {
        const { payload } = await dispatch(GetallappointmentApi(userId));
        setAppointments(payload || []);
      }
    };
    fetch_data();
  }, [userId, dispatch]);

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAppointments = appointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => 
    {
    if (page > 0 && page <= totalPages) 
      {
      setCurrentPage(page);
    }
  };
  
  const handle_appoinments=(id:number |string)=>
    {
  }



  return (
    <div className={Style.container}>
      <table className={Style.table}>
        <thead>
          <tr className={Style.tr}>
            <th>מספר מזהה</th>
            <th>שם </th>
            <th>ספר</th>
            <th>תאריך הפגישה</th>
            <th>פגישה</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.length > 0 ? (
            currentAppointments.map((Appointment, index) => (
              <tr key={index} className={Style.tr} onClick={()=>handle_appoinments(index)}>
                <td>{Appointment.appointment_id}</td>
                <td>{Appointment.username}</td>
                <td>{Appointment.barber}</td>
                <td>{format(new Date(Appointment.slot_date), 'MM/dd/yy HH:mm')}</td>
                <td>{Appointment.rolefor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>אין פגישות זמינות</td>
            </tr>
          )}
        </tbody>
      </table>


      {totalPages >= 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                הקודם
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                הבא
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default MyAppointments;
