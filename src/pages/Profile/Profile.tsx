import React from 'react'
import styles from  './Profile.module.css';

const Profile:React.FC=():JSX.Element=>{
  return (<>
  <div className={`${styles.container}`}>
    <form action="">
    <div className="mb-3 row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="text"  className="form-control-plaintext" id="staticEmail" />
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="staticpassword" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password"  className="form-control-plaintext" id="statstaticpassword" />
    </div>
  </div>
    </form>
</div>
  </>
  );
}

export default Profile