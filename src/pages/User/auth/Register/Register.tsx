import React, { useState, FormEvent, ChangeEvent } from 'react';
import PhoneInput, { Value as PhoneValue } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { fetchRegisterData } from '../../../../Redux/User/Auth/register';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Store';
import { useAppNavigate } from '../../../../Redux/Store';
import register from '../../../../interfaces/Auth';
import { useEffect } from 'react';
import { resetState } from '../../../../Redux/User/Auth/register';
import { Link } from 'react-router-dom';

// Add custom styles for PhoneInput
const phoneInputStyles = `
  .PhoneInput {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .PhoneInputCountry {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  }
  .PhoneInputCountryIcon {
    width: 1.5rem;
    height: 1.5rem;
  }
  .PhoneInputCountrySelect {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    border: 0;
    opacity: 0;
    cursor: pointer;
  }
  .PhoneInputInput {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.875rem;
    padding: 0;
    width: 100%;
  }
  .PhoneInputInput:focus {
    outline: none;
  }
`;

function Register() {
    const [register, setRegister] = useState<register>({
        username: '',
        email: '',
        phonenumber: '',
        password: '',
        confirm_password: '',
        isAdmin: false,
    });

    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.RegisterSlice);
    const navigate = useAppNavigate();

    useEffect(() => {
        dispatch(resetState());
    }, [dispatch]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const action = await dispatch(fetchRegisterData(register))
            if (fetchRegisterData.rejected.match(action)) {
                return;
            }
            navigate(`/`)
        }
        catch (error) {
            console.error("Register failed", error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setRegister((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePhoneChange = (phone: PhoneValue): void => {
        setRegister((prevState) => ({
            ...prevState,
            phonenumber: phone || '',
        }));
    };

    return (
        <>
            <style>{phoneInputStyles}</style>
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                            <div className="card shadow">
                                <div className="card-body p-4">
                                    <div className="text-center mb-4">
                                        <h2 className="h3 mb-2">Create Account</h2>
                                        <p className="text-muted">Join us and start your journey</p>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="Name" className="form-label">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="Name"
                                                        name="username"
                                                        value={register.username}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        name="email"
                                                        value={register.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Enter your email"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                                    <PhoneInput
                                                        defaultCountry="IL"
                                                        value={register.phonenumber}
                                                        onChange={handlePhoneChange}
                                                        required
                                                        className="form-control"
                                                        international
                                                        countryCallingCodeEditable={false}
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="exampleInputPassword1"
                                                        name="password"
                                                        value={register.password}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Create a password"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="exampleInputConfirmPassword1"
                                                        name="confirm_password"
                                                        value={register.confirm_password}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Confirm your password"
                                                    />
                                                </div>
                                            </div>
                                        </div>



                                        <div className="d-grid gap-3 mt-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="btn btn-primary py-2"
                                            >
                                                Create Account
                                            </button>

                                            <div className="text-center">
                                                <p className="text-muted mb-0">
                                                    Already have an account?{' '}
                                                    <Link 
                                                        to="/" 
                                                        className="text-decoration-none"
                                                    >
                                                        Sign in
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
        </>
    );
}

export default Register;
