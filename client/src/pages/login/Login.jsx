import React from 'react';
import './login.css'
import { useRef, useContext } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core'
export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
        
    }
    
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Login compete</h3>
                    <span className="loginDesc">
                        connect with your favourite competetive coders
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder='Email' type='email' required className='loginInput' ref={email} />
                        <input placeholder='Password' type='password' required minLength="6" className="loginInput" ref={password} />
                        <button className='loginButton' disabled={isFetching}> {isFetching ? <CircularProgress 
                            color="primary" size="25px" /> : "Log in"} </button>
                        <span className="loginForgot"> Forgot login details</span>
                        <button className="loginRegisterButton">
                            {isFetching ? <CircularProgress color="primary" size="25px" /> : "Create account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
