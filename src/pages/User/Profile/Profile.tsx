import React from 'react'
import styles from  './Profile.module.css';
import { useState } from 'react';
import { useAppSelector } from '../../../Redux/Store';
const Profile:React.FC=():JSX.Element=>{

      const [profile, setprofiledata] = useState<Record<string,string>>({
          username: '',
          email: '',
          phonenumber: '',
          password: '',
      });
      const [isedited,setEdited]=useState<boolean>(false);
      const { data } = useAppSelector((state) => state.loginSlice);
      

      const handle_edit=()=>
        {
          setEdited(!isedited);
        }





  return (<>
  <div className={`${styles.container}`}>
    <form action="">
    <div className={styles.imgcontainer}>
  <img className={styles.imgbackground} src="images/avatar.png"  />
</div>

    <div className="mb-3 row">
    <label htmlFor="UserName" className="col-sm-2 col-form-label"  >UserName</label>
    <div className="col-sm-10">
      <input type="text"  className="form-control-plaintext" id="UserName" value={data?.payload.UserName}  disabled={isedited}/>
    </div>
  </div>
    <div className="mb-3 row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label" >Email</label>
    <div className="col-sm-10">
      <input type="text"  className="form-control-plaintext" id="staticEmail"   disabled={isedited}/>
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="staticpassword" className="col-sm-2 col-form-label" >Password</label>
    <div className="col-sm-10">
      <input type="password"  className="form-control-plaintext" id="statstaticpassword"   disabled={isedited}/>
    </div>
  </div>

  <div className="mb-3 row">
    <label htmlFor="PhoneNumber" className="col-sm-2 col-form-label" >PhoneNumber</label>
    <div className="col-sm-10">
      <input type="text"  className="form-control-plaintext" id="PhoneNumber" value={data?.payload.Phonenumber} disabled={isedited}/>
    </div>
  </div>

  <button type="button" className="btn btn-primary" onClick={handle_edit} >{isedited? "save":"edit"}</button>

    </form>
</div>
  </>
  );
}

export default Profile