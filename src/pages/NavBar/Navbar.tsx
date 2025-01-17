import React from 'react';
import styles from  './NavBar.module.css';
import { Link } from 'react-router-dom';
const Navbar:React.FC=()=>{
  return (
    <nav className={`navbar navbar-expand-lg  ${styles.Navbar}`} dir="rtl"  >
        <ul className={styles.ul}>
        <li className="nav-item">
            <Link className="nav-link" aria-disabled="true" to="/Home" >בית</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/Profile">פרופיל </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link"  aria-disabled="true" to="/Roles">הפגישות שלי </Link>
          </li>
          <li className={`nav-item`}>
            <Link className="nav-link" id={`${styles.logout}`}aria-disabled="true" to="/" >יציאה</Link>
          </li>
        </ul>
  </nav>
  )
}

export default Navbar