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

    const { data, loading, error, successMessage } = useAppSelector((state) => state.login);
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
             navigate('/home')
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
            <form className={styles.login} onSubmit={handleLogin}>
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
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <Loading loading={loading} />
                <div className={styles.message}>
                    {error ? (
                        <div className={styles.error}>{error}</div>
                    ) : successMessage? (
                        <div className={styles.successMessage}>{data?.message}</div>
                    ) : null}
                </div>

                    <Link to="/Register">SignUp</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
