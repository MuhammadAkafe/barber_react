import React from 'react';
import styles from './AddAppoinment.module.css';
import Loading from '../../components/Loading/Loading';
function AddAppointment():JSX.Element 
{
  const add_appoinment=():void=>
  {
    console.log("add");
  }

  return (
    <>
    <div className={styles.container}>
     <div className={styles.addbutton}> 
       <Loading loading={false} error={null}/>
     </div>
    </div>
    </>
  );
}

export default AddAppointment;
