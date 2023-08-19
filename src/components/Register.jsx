import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import dog from "/Group 11.png";
import dogHappy from "/Group 12.png";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [pin, setpin] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePinChange = (event) => {
    setpin(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        {
          name,
          pin,
        }
      );

      setName("");
      setpin("");
      setSuccessMessage("registrasi berhasil");
      setError("");
      setShowModal(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to register");
      }
      setSuccessMessage("");
    }

    setIsLoading(false);
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-end align-items-center vh-100">
      <div className="row justify-content-end">
        <div className="col-md-5 pt-3 ms-2 me-xxl-5 ps-xxl-4 ">
          <h1>Sign Up</h1>

          <p className="mb-5">
            Sign Up yourself to access To Do List Apps to help you manage
            everything
          </p>
          {successMessage && (
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header>
                <Modal.Title>Registration Success</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={dogHappy}
                  alt="background"
                  className="img-fluid mt-3 mb-3 mx-auto d-block"
                  style={{ width: "30%" }}
                />
                <p className="text-center medium">
                  Congratulations, Registration Success. In a little while, you
                  will be able to enjoy the pleasures of the world. Next, Please
                  <Link
                    to={"https://todog-apps.netlify.app/"}
                    className="fw-bold"
                  >
                    {" "}
                    Login Here
                  </Link>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{ padding: "10px 20px" }}
                  variant="primary"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="basic-addon1"
                value={name}
                onChange={handleNameChange}
                required
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
            </div>
            <div className="input-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Pin (must 4 characters)"
                aria-label="Pin"
                aria-describedby="basic-addon1"
                value={pin}
                onChange={handlePinChange}
                maxLength={4}
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="d-grid gap-2 mt-5">
              <button
                className="btn btn-primary lg sign-up fw-bold"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "SIGN UP"}
              </button>
            </div>
          </form>
          <p className="mt-5 mb-1 text-center">Already have an account?</p>
          <p className="fw-bold text-center">
            <Link to={"https://todog-apps.netlify.app/"}>SIGN IN</Link>
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

export default Register;
