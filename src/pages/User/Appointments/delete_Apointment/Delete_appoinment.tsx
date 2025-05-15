// import React, { useState } from 'react'
// import { deleteAppointmentApi } from '../../../../Redux/User/Appointments/deleteAppointment';
// import { useAppDispatch } from '../../../../Redux/Store';
// import { GetUserAppointments_ } from '../../../../Redux/User/Appointments/GetAllappointments';
// function Delete_appoinment(){

//   const dispatch = useAppDispatch();

//   const confirmDelete = async () => {
//     if (appointmentToDelete) {
//       try {
//         await dispatch(deleteAppointmentApi(appointmentToDelete));
//         // Refresh appointments after deletion
//         const response = await dispatch(GetUserAppointments_({ userid: 19 }));
//         if (GetUserAppointments_.fulfilled.match(response)) {
//           setAppointments(response.payload);
//         }
//       } 
//       catch (error) {
//         console.error('Error deleting appointment:', error);
//       }
//     }
//     setShowDeleteModal(false);
//     setAppointmentToDelete(null);
//   };






//   return (
//     <>

//     </>
//   );
// }

// export default Delete_appoinment 