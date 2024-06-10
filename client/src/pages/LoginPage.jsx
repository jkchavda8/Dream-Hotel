import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";
import { setLogin } from '../redux/state';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const loggedIn = await response.json();
      console.log("Response from login API:", loggedIn);

      if (loggedIn) {
        dispatch(setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        }));
        console.log("User Logged In:", loggedIn.user);
        navigate("/");
      }
      console.log("Response from login API:", loggedIn);

    } catch (err) {
      console.log("Login failed", err.message)
    }
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <div className='login_content'>
          <form className='login_content_form' onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='submit'>LogIn</button>
          </form>
          <a href="/register">Don't have account? SignIn Here</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
