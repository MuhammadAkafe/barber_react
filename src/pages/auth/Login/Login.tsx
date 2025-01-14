import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/Store'; // Adjust import path based on your project structure
import { fetchLoginData,resetState  } from '../../../Redux/login'; // Assume `authSlice` contains a `loginUser` thunk
import { useAppNavigate } from '../../../hooks/hooks';
import { useAppSelector } from '../../../hooks/hooks';
import { useEffect } from 'react';
import Loading from '../../Loading/Loading';
const Login: React.FC = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useAppSelector((state) => state.login);
    const navigate = useAppNavigate();

    useEffect(() => {
        // Reset state when the component mounts
        dispatch(resetState());
    }, [dispatch]);

    const handleLogin = async (e: React.FormEvent) => 
        {
        e.preventDefault();
        try {
            const action = await dispatch(fetchLoginData(loginData)); // Dispatch the login action
            if (fetchLoginData.fulfilled.match(action)) 
                {
             navigate('/Home')
            }
        } 
        catch (err) {
            console.error("Login failed", err);
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className={styles.container}>
            <form className={styles.loginfrom} onSubmit={handleLogin}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Loading loading={loading} error={error} />
                    <Link to="/Register">SignUp</Link>
                </div>     
            </form>
          
        </div>
    );
};

export default Login;
