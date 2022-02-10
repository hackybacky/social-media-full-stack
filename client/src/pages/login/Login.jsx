import React from 'react';
import './login.css'
export default function Login() {
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
                    <div className="loginBox">
                        <input placeholder='Email' className='loginInput' />
                        <input placeholder='Password' className="loginInput" />
                        <button className='loginButton'> Log in </button>
                        <span className="loginForgot"> Forgot login details</span>
                        <button className="loginRegisterButton">Create new account </button>
                    </div>
                </div>
            </div>
      </div>
  )
}
