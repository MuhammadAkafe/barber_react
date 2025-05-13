import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/Store';
import { format } from 'date-fns';
import { GetUserAppointments_ } from '../../../Redux/User/Appointments/GetAllappointments';
import { GetAppointments } from '../../../interfaces/AppointmentData';
import { jwtDecode } from 'jwt-decode';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, UserIcon, ScissorsIcon, ClockIcon } from '@heroicons/react/24/outline';

function GetUserAppointments(): JSX.Element {
  const dispatch = useAppDispatch();
  const { data, access_token } = useAppSelector((state) => state.loginSlice);
  const [appointments, setAppointments] = useState<GetAppointments[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 5;
  const userId = data?.payload.UserID;
  const decoded = access_token ? jwtDecode(access_token) : null;

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        // Add your API call here
        // const response = await dispatch(GetUserAppointments_(userId));
        // setAppointments(response.payload);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchAppointments();
    }
  }, [userId, dispatch]);

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAppointments = appointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAppointmentClick = (id: number | string) => {
    console.log('Appointment clicked:', id);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5 ">
      <div className="card shadow-sm ">
        <div className="card-body p-3 p-md-4 ">
          <div className="text-center mb-4">
            <h2 className="card-title h3 mb-2">Your Appointments</h2>
            <p className="text-muted">View and manage your upcoming appointments</p>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 ">
              <thead >
                <tr className="table-light ">
                  <th scope="col" className="text-end py-3 d-none d-md-table-cell" style={{ width: '15%' }}>
                    <div className="d-flex align-items-center justify-content-end">
                      <span className="me-2">מספר מזהה</span>
                      <UserIcon style={{ width: '20px', height: '20px' }} className="text-muted" />
                    </div>
                  </th>
                  <th scope="col" className="text-end py-3" style={{ width: '20%' }}>
                    <div className="d-flex align-items-center justify-content-end">
                      <span className="me-2">שם</span>
                      <UserIcon style={{ width: '20px', height: '20px' }} className="text-muted" />
                    </div>
                  </th>
                  <th scope="col" className="text-end py-3 d-none d-md-table-cell" style={{ width: '20%' }}>
                    <div className="d-flex align-items-center justify-content-end">
                      <span className="me-2">ספר</span>
                      <ScissorsIcon style={{ width: '20px', height: '20px' }} className="text-muted" />
                    </div>
                  </th>
                  <th scope="col" className="text-end py-3" style={{ width: '25%' }}>
                    <div className="d-flex align-items-center justify-content-end">
                      <span className="me-2">תאריך הפגישה</span>
                      <CalendarIcon style={{ width: '20px', height: '20px' }} className="text-muted" />
                    </div>
                  </th>
                  <th scope="col" className="text-end py-3" style={{ width: '20%' }}>
                    <div className="d-flex align-items-center justify-content-end">
                      <span className="me-2">פגישה</span>
                      <ClockIcon style={{ width: '20px', height: '20px' }} className="text-muted" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.length > 0 ? (
                  currentAppointments.map((appointment, index) => (
                    <tr
                      key={index}
                      onClick={() => handleAppointmentClick(appointment.appointment_id)}
                      className="cursor-pointer"
                    >
                      <td className="text-end py-3 d-none d-md-table-cell">
                        <div className="d-flex align-items-center justify-content-end">
                          {appointment.appointment_id}
                        </div>
                      </td>
                      <td className="text-end py-3">
                        <div className="d-flex align-items-center justify-content-end">
                          {appointment.username}
                        </div>
                      </td>
                      <td className="text-end py-3 d-none d-md-table-cell">
                        <div className="d-flex align-items-center justify-content-end">
                          {appointment.barber}
                        </div>
                      </td>
                      <td className="text-end py-3">
                        <div className="d-flex align-items-center justify-content-end">
                          {format(new Date(appointment.slot_date), 'MM/dd/yy HH:mm')}
                        </div>
                      </td>
                      <td className="text-end py-3">
                        <div className="d-flex align-items-center justify-content-end">
                          {appointment.rolefor}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                        <CalendarIcon style={{ width: '25px', height: '25px' }} className="text-muted" />
                        <p className="text-muted mb-0">אין פגישות זמינות</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav aria-label="Page navigation" className="mt-4">
              <ul className="pagination justify-content-center mb-0 flex-wrap">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronRightIcon style={{ width: '20px', height: '20px' }} />
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronLeftIcon style={{ width: '20px', height: '20px' }} />
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetUserAppointments;
