import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Home.module.css"
import { useEffect } from 'react'
import axios from 'axios'
import apiInstance from '../../interfaces/axiosInstance'
import { useAppSelector } from '../../hooks/hooks'
function Home() {
    const {accessToken}=useAppSelector(state=>state.login)
  useEffect(()=>{
    apiInstance.post("/Home",{
      data:"hello from home"
    },{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    }
  )
  },[])
  return (
    <>
<div className={styles.btns}>
<Link  to="/Profile">Profile</Link>
<Link  to="/Roles">Roles</Link>
</div>


    </>

  )
}

export default Home