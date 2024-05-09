import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
const Registration = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const registerNewAccount = async () => {

    try {
      const response = await fetch("http://localhost:8090/registerNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the correct content type
        },
        body: JSON.stringify({
          userFirstName: userFirstName,
          userLastName: userLastName,
          userName: userName,
          userPassword: userPassword,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      Swal.fire("Success", "You successfully registered!", "success");
      navigate("/login");
    } catch (err) {
      console.log(err);
      console.error("Error creating user:", err);
      setError(err.message);
      Swal.fire("Error", `Failed to register: ${err.message}`, "error"); // Display error message
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    registerNewAccount(); // Call the registration function
  };

  return (
    <div className="container">
      <div className="registration-header">
        <h3>Create New Account</h3>
      </div>
      <div className="registration-form">
        <form className="row g-3 p-5" onSubmit={handleFormSubmit}>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => setUserFirstName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => setUserLastName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-12">
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ background: "#6351ce", border: "#6351ce" }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
