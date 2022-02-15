import React from 'react';
import './register.css'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios'
export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        if (password.current.value !== passwordAgain.current.value) {

            password.current.setCustomValidity("password don't match")
        }
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,

            };
            try {
                await axios.post('/auth/register', user);
                history('/login');

            } catch (err) {
                console.log(err);
            }
        }

    }
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
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder='Username' required className="loginInput" ref={username} />
                        <input placeholder='Email' type="email" required className='loginInput' ref={email} />

                        <input placeholder='Password' type="password" minLength="6" required ref={password} className="loginInput" />
                        <input placeholder='Password Again' type="password" minLength="6" required ref={passwordAgain} className="loginInput" />

                        <button className='loginButton' type="submit"> Sign up </button>
                        <Link to="/login">
                            <button className="loginRegisterButton">login into your account </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
