import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearError, resetState, sendVerificationCodeapi } from '../../../../Redux/User/Auth/sendVerificationCodeapi';
import { AppDispatch, useAppSelector } from '../../../../Redux/Store';

function Email() {
    const [form, setForm] = useState({
        email: ''
    });
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.sendVerificationCodeSlice);

    useEffect(() => {
        dispatch(resetState());
    }, [dispatch]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const action = await dispatch(sendVerificationCodeapi(form.email));
            if (sendVerificationCodeapi.fulfilled.match(action)) 
              {
                localStorage.setItem('email', form.email);
                navigate('/verification');
            }
        } catch (err) {
            console.error('Error sending verification code:', err);
        }
    };



    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <div className="card shadow-lg border-0 bg-dark text-light">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <h2 className="h3 mb-2 text-light">Enter Email</h2>
                                    <p className="text-light">We'll send you a verification code in number</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="flex-grow-1">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                />
                                            </div>
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary px-4 py-2 bg-gradient"
                                            >
                                                {loading ? (
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                ) : 'Continue'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {error && (
                                    <div className="alert alert-danger mt-3 d-flex align-items-center" role="alert">
                                        <i className="bi bi-exclamation-circle-fill me-2"></i>
                                        <div>{error}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Email;

function setCode(arg0: string): any {
  throw new Error('Function not implemented.');
}
function setUserid(userid: any): any {
    throw new Error('Function not implemented.');
}

