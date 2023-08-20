import React, { useState, useEffect } from "react";
import { Container, Navbar, Button, Modal, Image } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import dogHappy from "/Group 12.png";
import "./OTP.css";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Move to the next input box
    if (value !== "" && event.target.nextSibling) {
      event.target.nextSibling.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain");
    const newOtp = [...otp];

    for (let i = 0; i < Math.min(pasteData.length, 6); i++) {
      newOtp[i] = pasteData[i];
    }

    setOtp(newOtp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem("email");
    const otpString = otp.join("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/verify",
        {
          email,
          otp: otpString,
        }
      );

      console.log(response);

      if (response.status != 200) {
        throw new Error("OTP verification failed");
      }

      localStorage.removeItem("email"); // Menghapus token dari localStorage
      // Verifikasi OTP berhasil
      setSuccessModalVisible(true);
    } catch (error) {
      // Verifikasi OTP gagal
      console.error(error);
      setError("Wrong OTP, try again.");
    }
  };

  const maskedEmail = email
    ? email.charAt(0) +
      "*".repeat(email.indexOf("@") - 1) +
      email.substring(email.indexOf("@"))
    : "";

  return (
    <div className="mt-5">
      <div className="container otp-main-2 mt-4 mt-md-0 ">
        <h1 className="fw-bold">Input Your OTP</h1>
        <p className="text-center mt-3 mt-sm-5 mb-4">
          Input your 6 digit OTP here{" "}
          <span className="fw-bolder">{maskedEmail}</span>
        </p>
        <form className="text-center" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(event) => handleChange(index, event)}
                onPaste={handlePaste}
                className="text-center"
              />
            ))}
          </div>
          {error && <p className="text-danger mt-3 mb-3">{error}</p>}
          <Button
            className="otp__btn col-12 rounded-4 border-0 mt-2 mt-sm-5"
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>

      <Modal show={successModalVisible} centered>
        <Modal.Body className="text-center m-2">
          <img
            src={dogHappy}
            alt="correct"
            className="img-fluid mt-3 mb-3 mx-auto d-block"
            style={{ width: "30%" }}
          />
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Successful registration
          </p>
          <p>Click OK to login.</p>
          <Button
            style={{
              padding: "10px 20px",
              width: "100%",
              background: "#095f62",
              border: "none",
            }}
            variant="primary"
            className="block"
            as={Link}
            to="/"
          >
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OTP;
