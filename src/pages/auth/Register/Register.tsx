import React, { useState, FormEvent, ChangeEvent } from 'react';
import styles from './Register.module.css';
import PhoneInput, { Value as PhoneValue } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { fetchRegisterData } from '../../../Redux/Auth/register';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Loading from '../../components/Loading/Loading';
import { useAppNavigate } from '../../../hooks/hooks';
import register from '../../../interfaces/Auth';
import { useEffect } from 'react';
import { resetState } from '../../../Redux/Auth/register';

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
            if (fetchRegisterData.rejected.match(action)) 
                {
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
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3>Sign Up</h3>
                </div>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="username"
                        value={register.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email Input */}
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
                    />
                </div>

                {/* Phone Number Input */}
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <PhoneInput
                        defaultCountry="IL"
                        value={register.phonenumber}
                        onChange={handlePhoneChange}
                        required
                    />
                </div>

                {/* Password Input */}
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
                    />
                </div>

                {/* Confirm Password Input */}
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
                    />
                </div>
                <Loading loading={loading} error={error} />
            </form>
        </div>
    );
}

export default Register;
