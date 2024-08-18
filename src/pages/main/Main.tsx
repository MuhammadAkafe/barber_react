import React from 'react'
import styles from "./Main.module.css"
import { useNavigate } from 'react-router-dom'
function Main() {
  const  navigate = useNavigate()
  const login_page=()=>
  {
    navigate('/Login')
  }
  return (
 <>
      <nav className={`navbar navbar-expand-lg bg-body-tertiary ${styles.navbar}`} >
    <div className={`container-fluid `}>
      <div className={`collapse navbar-collapse ${styles.navbar}`} id="navbarNav" >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" >من نحن</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" >خدماتنا</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">شحن ارصيده</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">رزم الاتصالات</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">الاجهزه الخلويه</a>
          </li>          
          <li className="nav-item">
            <a className="nav-link" aria-current="page">متجر الاتصالات الرقميه </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">اتصل بنا</a>
          </li>
          <li className="nav-item" id={`${styles.Agents_Login}`}>
            <a className="nav-link" aria-current="page">دخول الوكلاء</a>
          </li>
        </ul>
      </div>
      <div>
      </div>
    </div>
  </nav>
  <div className={'main_content'} id={`${styles.main_content}`} >
  <div className={styles.company}>
    <div className='paragrapth'>
    شركه الشروق للاتصالات 
    الخلويه المتقدمه
    </div>
    <div className={`${styles.btns}`}>
    <button type="button" className="btn btn-primary rounded-pill" onClick={login_page}>دخول الوكلاء</button>
    <button type="button" className="btn btn-primary ">دخول الزبائن</button>
    </div>
    </div>
  </div>
 </>

  )
}

export default Main