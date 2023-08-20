import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";
import dog from "/Group 11.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email,
          password,
        }
      );

      // Simpan token ke penyimpanan lokal (localStorage atau session storage)
      localStorage.setItem("token", response.data.data.token);

      // Redirect ke halaman localhost:3000 setelah login berhasil
      window.location.href = "http://localhost:5173/homepage";
    } catch (error) {
      setError("Invalid password");
    }
    setIsLoading(false);
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-end align-items-center vh-100">
      <div className="row justify-content-end">
        <div className="col-md-5 pt-3 ms-2 me-xxl-5 ps-xxl-4 ">
          <h1>Sign In</h1>

          <p className="mb-5">Ready to access a Homepage?</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                aria-label="email"
                aria-describedby="basic-addon1"
                value={email}
                onChange={handleEmailChange}
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
            </div>
            <div className="input-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Passwword"
                aria-label="password"
                aria-describedby="basic-addon1"
                value={password}
                onChange={handlePasswordChange}
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
            </div>
            <div className="ms-auto">
              <p className="mt-3" style={{ fontSize: "14px" }}>
                {" "}
                <Link to="/forget-password">Forget Password?</Link>
              </p>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="d-grid gap-2 mt-5">
              <button
                className="btn btn-primary lg sign-up fw-bold"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "SIGN IN"}
              </button>
            </div>
          </form>
          <p className="mt-5 mb-1 text-center">Don't have an account?</p>
          <p className="fw-bold text-center">
            <Link to={"http://localhost:5173/register"}>SIGN UP</Link>
          </p>
        </div>

        <div className="col-md-6 d-flex justify-content-end">
          <img
            src={dog}
            alt="background"
            className="img-fluid"
            style={{ width: "90%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
