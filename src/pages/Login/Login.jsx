import React, { useEffect, useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import { toast } from 'react-toastify';

const Login1 = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const doLogin = async () =>{
        const res = await dispatch(login(email, password));
        if (res.status_code === 200) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated, navigate])
    return (
        <div className="login-page">
            <div className="login-box">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Login to continue</p>
                <form 
                    className="login-form" 
                    onSubmit={(e) => {
                        e.preventDefault(); // ✅ Ngăn reload trang
                        doLogin();
                    }}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}     
                    />

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>

                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login1;