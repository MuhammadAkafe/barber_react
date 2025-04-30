import React from 'react';
import styles from  './Menu.module.css';
import { Link } from 'react-router-dom';
const Menu:React.FC=()=>{
  return (
    <nav className={`${styles.Navbar}`}>       
<i className={`bi bi-list ${styles.menu_icon}`} data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"></i>

<div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex={-1} id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="staticBackdropLabel" style={{color:"#0D6EFD"}}>המידע שלי</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
<ul className={`${styles.ul}`}>

  <Link className={`${styles.li}`} to={'/AddAppointment'}>

  <i className="bi bi-calendar-plus"></i>
  <span className={`${styles.span}`}>
    הוספה פגישה
  </span>
  </Link>

  <Link className={`${styles.li}`} to={"/MyAppointments"}>
  <i className="bi bi-calendar3"></i>
  <span className={`${styles.span}`}>
   הפגישות שלי
  </span>
  </Link>

  <Link className={`${styles.li}`} to={'/Profile'}>
  <i className="bi bi-person-fill"></i>
  <span className={`${styles.span}`}>
  פרופיל
  </span>
  </Link>


  <Link className={`${styles.li}`} to={`/`}>
  <i className="bi bi-box-arrow-left" style={{
    color:"red"
  }}></i>
  <span className={`${styles.logout}`}>
  התנתיק
  </span>
  </Link>
</ul>
  </div>
</div>

<span className={`${styles.userAvatar}`} >
  <span className={`${styles.name}`}>Your Name</span>
  <img className={`${styles.imgbackground}`}>
  </img>
  
</span>

  </nav>
  )
}

export default Menu