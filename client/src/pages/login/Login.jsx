import React from 'react';
import './login.css'
import { useRef } from 'react';
export default function Login() {
    const email = useRef();
    const password = useRef();
    const handleClick = (e) => {
        e.preventDefault();
        console.log(email);//last
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
                        <button className='loginButton'> Log in </button>
                        <span className="loginForgot"> Forgot login details</span>
                        <button className="loginRegisterButton">Create new account </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
