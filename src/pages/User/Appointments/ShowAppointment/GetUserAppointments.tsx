import React, { useEffect ,useState} from 'react'
import { useAppDispatch } from '../../../../Redux/Store';
import { GetUserAppointments_ } from '../../../../Redux/User/Appointments/GetAllappointments';
import { deleteAppointmentApi } from '../../../../Redux/User/Appointments/deleteAppointment';
import Table from './Table';
import Pagnation from './Pagnation';
function GetUserAppointments() {

  const [appointments, setAppointments] = useState<any[]>([]);
  const [current_page, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);


  const number_of_appointments = 5;
  let numberofpages = Math.ceil(appointments.length / number_of_appointments);
  const start_index = (current_page - 1) * number_of_appointments;
  const end_index = start_index + number_of_appointments;
  const current_appointments = appointments.slice(start_index, end_index);


  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchAppointments = async () => {
        const response = await dispatch(GetUserAppointments_({
          userid: 0,
        }));
        if (GetUserAppointments_.fulfilled.match(response)) 
          {
          console.log(response.payload);
          setAppointments(response.payload);
        }
    };
    fetchAppointments();
  }, []);



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (id: number) => {
    console.log('Edit appointment:', id);
  };

  const handleDelete = async (appointment_id: number) => 
    {
      setShowDeleteModal(true);
      setAppointmentToDelete(appointment_id);
  };

  const confirmDelete = async () => {
    if (appointmentToDelete) {
      const response = await dispatch(deleteAppointmentApi(appointmentToDelete));
      if (deleteAppointmentApi.fulfilled.match(response)) {
        const response = await dispatch(GetUserAppointments_({
          userid: 19,
        }));
        if (GetUserAppointments_.fulfilled.match(response)) 
          {
          console.log(response.payload);
          setAppointments(response.payload);
        }
        setShowDeleteModal(false);
        setAppointmentToDelete(null);
      }
    }
  }


  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="card shadow-lg border-0 rounded-4" style={{ width: '90%', maxWidth: '1200px' }}>
        <div className="card-body p-4">
          <div className="table-responsive">
            <Table handle_Edit={handleEdit} handleDelete={handleDelete} current_appointments={current_appointments} />
            <div className="d-flex justify-content-center mt-4">
              <nav aria-label="Page navigation">
                <Pagnation current_page={current_page} numberofpages={numberofpages} handlePageChange={handlePageChange} />
              </nav>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">מחיקת תור</h5>
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setShowDeleteModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>האם אתה בטוח שברצונך למחוק תור זה?</p>
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowDeleteModal(false)}
                    >
                      ביטול
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-danger" 
                      onClick={confirmDelete}
                    >
                      מחק
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showDeleteModal && (
            <div className="modal-backdrop fade show"></div>
          )}

    </div>
  )
}

export default GetUserAppointments
