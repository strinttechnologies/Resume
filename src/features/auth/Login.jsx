import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone'); // phone | otp
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOTP = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/auth/otp/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            const data = await res.json();

            if (res.ok) {
                setStep('otp');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/auth/otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, otp })
            });
            const data = await res.json();

            if (res.ok) {
                // Save token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                if (onLoginSuccess) onLoginSuccess(data.user);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // In a real app, this would trigger the Google OAuth flow
        // For now, this is a placeholder for the Google Button
        alert("Google Sign-in requires a valid Client ID and Frontend SDK setup. See Walkthrough.");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Sign in to access your resumes</p>

                {error && <div className="login-error">{error}</div>}

                {step === 'phone' ? (
                    <>
                        <Input
                            label="Mobile Number"
                            placeholder="+1234567890"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button className="btn-primary full-width" onClick={handleSendOTP} disabled={loading}>
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </>
                ) : (
                    <>
                        <div className="otp-info">OTP sent to {phone}</div>
                        <Input
                            label="Enter OTP"
                            placeholder="123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button className="btn-primary full-width" onClick={handleVerifyOTP} disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>
                        <button className="btn-text" onClick={() => setStep('phone')}>Change Number</button>
                    </>
                )}

                <div className="divider"><span>OR</span></div>

                <button className="btn-google" onClick={handleGoogleLogin}>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
