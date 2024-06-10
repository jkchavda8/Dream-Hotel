import React, { useEffect, useState } from 'react';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formDate, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    profileImage: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formDate,
      [name]: name === "profileImage" ? files[0] : value
    });
  };

  console.log(formDate);
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(formDate.password === formDate.cpassword || formDate.cpassword === "");
  }, [formDate.password, formDate.cpassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();
      for (var key in formDate) {
        registerForm.append(key, formDate[key]);
      }
      const response = await fetch('http://localhost:5000/auth/register', {
        method: "POST",
        body: registerForm
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='register-container'>
      <div className='register'>
        <div className='register_content'>
          <form onSubmit={handleSubmit}>
            <input placeholder='First Name' name='firstName' type='text' value={formDate.firstName} onChange={handleChange} required />
            <input placeholder='Last Name' name='lastName' type='text' value={formDate.lastName} onChange={handleChange} required />
            <input placeholder='Email' name='email' type='email' value={formDate.email} onChange={handleChange} required />
            <input placeholder='Password' name='password' type='password' value={formDate.password} onChange={handleChange} required />
            <input placeholder='Confirm Password' name='cpassword' type='password' value={formDate.cpassword} onChange={handleChange} required />
            {!passwordMatch && (
              <p style={{ color: "red" }}>Passwords do not match!</p>
            )}
            <input id='image' type='file' name='profileImage' accept='image/*' style={{ display: 'none' }} onChange={handleChange} required />
            <label htmlFor="image">
              <img src="/assets/addImage.jpg" alt="add profile photo" />
              <p>Upload Your Photo</p>
            </label>
            {formDate.profileImage && (
              <img src={URL.createObjectURL(formDate.profileImage)} alt="profile photo" style={{ maxWidth: "80px" }} />
            )}
            <button type='submit' disabled={!passwordMatch}>Register</button>
          </form>
          <a href='/login'>Already have an account? LogIn Here</a>
        </div>
      </div>
    </div>  
  )
}

export default RegisterPage;
