import React from 'react';
import styles from  './NavBar.module.css';
import { Link } from 'react-router-dom';
const Navbar:React.FC=()=>{
  return (
    <nav className={`navbar navbar-expand-lg  ${styles.Navbar}`} dir="rtl"  >
        <ul className={styles.ul}>
        <li className="nav-item">
            <Link className={`nav-link ${styles.navlink}`} aria-disabled="true" to="/Profile" >פרופיל</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${styles.navlink}`} aria-current="page" to="/MyAppointments">הפגישות שלי</Link>
          </li>
          <li className="nav-item">
          <Link className={`nav-link ${styles.navlink}`}  aria-disabled="true" to="/AddAppointment">הוספה פגישה</Link>
          </li>
          <li className={`nav-item`}>
            <Link className={`nav-link ${styles.navlink}`} id={`${styles.logout}`} aria-disabled="true" to="/" >יציאה</Link>
          </li>
        </ul>
  </nav>
  )
}

export default Navbar