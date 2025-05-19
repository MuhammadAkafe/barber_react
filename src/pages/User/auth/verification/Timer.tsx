import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../Redux/Store';

interface TimerProps {
    handleResend: () => void;
}

const Timer: React.FC<TimerProps> = ({ handleResend }) => {
    const [timeLeft, setTimeLeft] = useState<number>(300); // Start with 5 minutes
    const { data } = useAppSelector((state) => state.sendVerificationCodeSlice);

    useEffect(() => {
        if (data?.expiresIn) {
            setTimeLeft(data.expiresIn);
        }
    }, [data]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-center">
            <p className="text-light mb-0">
                Didn't receive the code?{' '}
                {timeLeft > 0 ? (
                    <span className="text-light">
                        Resend in {formatTime(timeLeft)}
                    </span>
                ) : (
                    <button
                        type="button"
                        className="btn btn-link text-primary p-0"
                        onClick={handleResend}
                    >
                        Resend
                    </button>
                )}
            </p>
        </div>
    );
};

export default Timer;