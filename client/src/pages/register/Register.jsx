import React from 'react';
import './register.css'
export default function Register() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Register Page </h3>
                    <span className="loginDesc">
                        connect with your favourite competetive coders 
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder='Username' className="loginInput" />
                        <input placeholder='Email' className='loginInput' />
                        
                        <input placeholder='Password' className="loginInput" />
                        <input placeholder='Password Again' className="loginInput" />

                        <button className='loginButton'> Sign up </button>
                       
                        <button className="loginRegisterButton">login into your account </button>
                    </div>
                </div>
            </div>
      </div>
  )
}
