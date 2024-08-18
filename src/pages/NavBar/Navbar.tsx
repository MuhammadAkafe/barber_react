import React from 'react';
import styles from  './NavBar.module.css';

function navbar() {
  return (
    <nav className={`navbar navbar-expand-lg  ${styles.Navbar}`} dir="rtl"  >
    <div className="container-fluid">
      <a className="navbar-brand" href="#">الطلبات</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">الوكلاء </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">التقارير</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">الملف الشخصي </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" aria-disabled="true">تسجيل الخروج </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default navbar