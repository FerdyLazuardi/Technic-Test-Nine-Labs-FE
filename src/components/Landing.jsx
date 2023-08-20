import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import dog from "/Group 13.png";
import jwt_decode from "jwt-decode";

const Landing = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const user_name = decodedToken.username;
  console.log(decodedToken);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-end align-items-center vh-100">
        <div className="row justify-content-end">
          <div className="col-md-5 pt-3 ms-2 me-xxl-5 ps-xxl-4 d-flex flex-column justify-content-center ">
            <h1 className=" mb-4 reset fw-bold" style={{ fontSize: "26px" }}>
              Hello {user_name}! Enjoy using the homepage
            </h1>

            <p style={{ fontSize: "14px" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting.
            </p>
            <a
              href="https://linkedin.com/in/ferdy10"
              className="mb-3"
              style={{ fontSize: "14px" }}
              target="_blank"
            >
              KNOW ME BETTER
            </a>
            <a
              className="btn btn-primary lg sign-up fw-bold"
              onClick={handleLogout}
              style={{ width: "25%", padding: "5px" }}
              href="/"
            >
              Log Out
            </a>
          </div>

          <div className="col-md-6 d-flex justify-content-end">
            <img
              src={dog}
              alt="background"
              className="img-fluid"
              style={{ width: "1920px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
