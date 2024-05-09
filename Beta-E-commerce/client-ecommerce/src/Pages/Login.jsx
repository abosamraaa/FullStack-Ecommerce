import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Ensure the secret key is in the correct format


  const handleFormSubmit = async (e) => {
    e.preventDefault();




    fetch('http://localhost:8090/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        userPassword: password, // Send the encrypted password
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log('Login successful:', json);

        const token = json.jwtToken;
        if (!token) {
          throw new Error('Invalid login response.');
        }
        const role = json.user.roles[0].roleName;
        if (!token) {
          throw new Error('Invalid login response.'); // Handle missing token
        }

        sessionStorage.setItem('jwtToken', token);
        
        sessionStorage.setItem('role',role);

        const isAdmin = json.user.roles.some((role) => role.roleName.toLowerCase() === 'admin');
        
        if (isAdmin) {
          navigate('/dashboard'); // Redirect to admin dashboard
        } else {
          navigate('/'); // Redirect to home
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Login failed!',
          text: `Error: ${error.message}`,
          icon: 'error',
        });
      });
  };
  return (
    <div className="container login-container">
      <form className="p-2" onSubmit={handleFormSubmit}>
        <h1 className="text-center p-2">Login</h1>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail3"
              onChange={(e)=>{
                setUserName(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary col-12">
          Sign in
        </button>
        <div className="registerbtn">
          <span>Dont have an account?</span>
          <Link to="/signup"> Register Now</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;









