import React, { useEffect, useState, useCallback } from 'react';
import { store, useAppDispatch, useAppSelector } from '../../../../Redux/Store';
import { GetUserAppointments_ } from '../../../../Redux/User/Appointments/GetAllappointments';
import { deleteAppointmentApi } from '../../../../Redux/User/Appointments/deleteAppointment';
import Table from './Table';
import Pagnation from './Pagnation';
import { GetAppointments } from '../../../../interfaces/AppointmentData';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => 
  {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">מחיקת תור</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <p>האם אתה בטוח שברצונך למחוק תור זה?</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
              >
                ביטול
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={onConfirm}
              >
                מחק
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

const ITEMS_PER_PAGE = 5;

function GetUserAppointments() {
  const [appointments, setAppointments] = useState<GetAppointments[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);
  const {loading,error}=useAppSelector((state)=>state.GetallappointmentSlice)
  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAppointments = appointments.slice(startIndex, endIndex);

  const fetchAppointments = useCallback(async () => {
 
      const action = await dispatch(GetUserAppointments_({ userid: 
       store.getState().loginSlice.data?.userid
       }));
      
      if (GetUserAppointments_.fulfilled.match(action)) 
        {
        setAppointments(action.payload);
    } 

  }, [dispatch]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  
  const handleEdit = (id: number) => {
    // TODO: Implement edit functionality
    console.log('Edit appointment:', id);
  };

  const handleDelete = (appointmentId: number) => 
    {
    setAppointmentToDelete(appointmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => 
    {
    if (!appointmentToDelete) return;
      const action = await dispatch(deleteAppointmentApi(appointmentToDelete));
      if (deleteAppointmentApi.fulfilled.match(action)) {
        await fetchAppointments();
        setShowDeleteModal(false);
        setAppointmentToDelete(null);
      }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="card shadow-lg border-0 rounded-4" style={{ width: '90%', maxWidth: '1200px' }}>
        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="table-responsive">
            <Table 
              handle_Edit={handleEdit} 
              handleDelete={handleDelete} 
              current_appointments={currentAppointments} 
              loading={loading} 
            />
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <nav aria-label="Page navigation">
                  <Pagnation 
                    current_page={currentPage} 
                    numberofpages={totalPages} 
                    handlePageChange={handlePageChange} 
                  />
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteModal 
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAppointmentToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default GetUserAppointments;

