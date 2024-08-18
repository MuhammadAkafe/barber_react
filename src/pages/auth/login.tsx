import React, { useState } from 'react';
import styles from './login.module.css';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {

  const [login_data,setFormData]=useState<LoginData>({
    email:"",
    password:""
  });

  const handle_submit = (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>): void => 
    {
    event.preventDefault();
    console.log('Form submitted');
    }
    const handle_change=(e:React.ChangeEvent<HTMLInputElement>):void=>
      {
        const { name, value } = e.target;
        setFormData((login_data) => ({
          ...login_data,
          [name]: value,
        }));
    }

  return (
    <>
      <form className={`${styles.form}`} onSubmit={(e)=>handle_submit(e)} method='post'>
        <div className={styles.login}>
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className={`form-label `}
            >Email address</label>
            <input type="email" className="form-control" name='email'  onChange={handle_change} id="exampleInputEmail1" aria-describedby="emailHelp" required/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password"  name='password'  className="form-control" id="exampleInputPassword1" 
             onChange={handle_change}
             required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <div className={`${styles.btn}`}>
          <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>

      </form>
    </>
  );
}

export default Login;
