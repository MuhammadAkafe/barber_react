import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLoginData, resetState } from '../../../../Redux/User/Auth/login'; 
import { useAppNavigate, useAppSelector, AppDispatch } from '../../../../Redux/Store'
import { useEffect } from 'react';

const Login: React.FC = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useAppSelector((state) => state.loginSlice);
    const navigate = useAppNavigate();

    useEffect(() => {
        dispatch(resetState());
    }, [dispatch]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const action = await dispatch(fetchLoginData(loginData));
            
            if (fetchLoginData.rejected.match(action)) {
                return;
            }
            navigate('/Profile');
        } 
        catch (err) {
            console.error("Unexpected error", err);
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
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <h2 className="h3 mb-2">Welcome Back</h2>
                                    <p className="text-muted">Sign in to your account</p>
                                </div>

                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={loginData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={loginData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <div className="d-grid gap-3">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn btn-primary py-2"
                                        >
                                            Sign in
                                        </button>

                                        <div className="text-center">
                                            <p className="text-muted mb-0">
                                                Don't have an account?{' '}
                                                <Link 
                                                    to="/Register" 
                                                    className="text-decoration-none"
                                                >
                                                    Sign up
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
