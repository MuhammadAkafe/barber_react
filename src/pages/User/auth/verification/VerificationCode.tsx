import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../../../Redux/Store';
import { useNavigate } from 'react-router-dom';
import phonenumber, { verify_code, sendVerificationCodeapi } from '../../../../Redux/User/Auth/phonenumber';
import Timer from './Timer';

function VerificationCode() {
    const [verificationCode, setVerificationCode] = useState({
        code: '',
        email: ''
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error, data } = useAppSelector((state) => state.sendVerificationCodeSlice);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        handle_display_time();
    };

    const handle_display_time = async () => {

        const action = await dispatch(verify_code({
            code: verificationCode.code,
            email: verificationCode.email
        }));    

        if(verify_code.fulfilled.match(action)) {
            navigate('/updatepassword');
        }
    }

    const handleResend = async () => {

        const phonenumber = localStorage.getItem('phonenumber');
        if (!phonenumber) {
            console.error('Phone number not found in localStorage');
            return;
        }
        const action = await dispatch(sendVerificationCodeapi(phonenumber));
        console.log('Resend API Response:', action.payload);
    }

    const handleCodeChange = (index: number, value: string) => {
        const newCode = (verificationCode.code || '').split('');
        newCode[index] = value;
        setVerificationCode({ ...verificationCode, code: newCode.join('') });

        // Handle new input
        if (value.length === 1) {
            const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            
            // Clear current input
            const newCode = (verificationCode.code || '').split('');
            newCode[index] = '';
            setVerificationCode({ ...verificationCode, code: newCode.join('') });

            // Move to previous input if not at first position
            if (index > 0) {
                const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
                if (prevInput) prevInput.focus();
            }
        }
    };

    const isCodeComplete = (verificationCode.code || '').length === 6;

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <div className="card shadow-lg border-0 bg-dark text-light">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <h2 className="h3 mb-2 text-light">Verification Code</h2>
                                    <p className="text-light">Enter the code sent to your phone</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-center gap-2">
                                            {[...Array(6)].map((_, index) => (
                                                <input
                                                    key={index}
                                                    data-index={index}
                                                    type="text"
                                                    maxLength={1}
                                                    className="form-control bg-dark text-white border-secondary text-center"
                                                    style={{ width: '50px', height: '50px' }}
                                                    value={(verificationCode.code || '')[index] || ''}
                                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                    disabled={loading}
                                                    autoComplete="off"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="d-grid gap-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary py-2 bg-gradient"
                                            disabled={loading || !isCodeComplete}
                                        >
                                            {loading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : 'Verify'}
                                        </button>
                                        
                                        <Timer handleResend={handleResend} />
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

export default VerificationCode;