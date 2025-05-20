import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../Redux/Store';
import { update_password_Api, resetState } from '../../../../Redux/User/Auth/update_passwrd';
import { useAppSelector } from '../../../../Redux/Store';
import { useNavigate } from 'react-router-dom';
import Email from './../email/Email';

function UpdatePassword() 
{
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const {error,loading} = useAppSelector((state)=>state.updatepasswordSlice);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(resetState());
    }, [dispatch]);


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        if (!email) {
            console.error('Email not found in localStorage');
            return;
        }
            const action=await dispatch(update_password_Api(
                {
                    email:email,
                    newPassword: passwords.newPassword,
                    confirmPassword: passwords.confirmPassword
                }
            ));
            if(update_password_Api.fulfilled.match(action))
            {
                navigate('/');
            }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));
    };



    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <div className="card shadow-lg border-0 bg-dark text-light">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <h2 className="h3 mb-2 text-light">Update Password</h2>
                                    <p className="text-light">Create a strong password</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label text-light">New Password</label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control bg-dark text-white border-secondary"
                                                id="newPassword"
                                                name="newPassword"
                                                value={passwords.newPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="confirmPassword" className="form-label text-light">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control bg-dark text-white border-secondary"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={passwords.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="d-grid gap-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary py-2 bg-gradient"
                                            disabled={passwords.newPassword !== passwords.confirmPassword}
                                        >
                                            {
                                                loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                                 "Update Password"
                                            }
                                        </button>
                                    </div>
                                </form>
                                {
                                    error && <div className="mt-3 alert alert-danger">{error}</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatePassword; 