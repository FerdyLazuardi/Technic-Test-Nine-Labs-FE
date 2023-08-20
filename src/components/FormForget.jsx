import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import dog from "/Group 11.png";
import dogHappy from "/Group 12.png";

import "./Register.css";

function FormForget() {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/generate-link",
        { email }
      );

      if (response.status === 200) {
        setSuccessMessage("Reset password link has been sent to your email.");
        setShowModal(true);
        setEmail("");
        localStorage.setItem("email", email);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-end align-items-center vh-100">
      <div className="row justify-content-end">
        <div className="col-md-5 pt-3 ms-2 me-xxl-5 ps-xxl-4 ">
          <h1 className="fw-bold mb-4">Forget Password</h1>

          <form onSubmit={handleFormSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Example: johndoe@gmail.com"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="d-grid gap-2 mt-4">
              <button
                className="btn btn-primary lg sign-up fw-bold"
                type="submit"
                disabled={isLoading}
              >
                Reset Password
              </button>
            </div>
          </form>
          <Modal
            show={isLoading}
            centered
            className="d-flex align-items-center justify-content-center"
          >
            <Modal.Body style={{ width: "200px" }} className="text-center">
              <p>Please Wait...</p>
            </Modal.Body>
          </Modal>

          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Body className="text-center">
              <p className="mb-0 mt-3 fw-bold" style={{ fontSize: "25px" }}>
                Sent Successfully
              </p>
              <img
                src={dogHappy}
                alt="correct"
                className="img-fluid mt-3 mb-3 mx-auto d-block"
                style={{ width: "30%" }}
              />{" "}
              <p className="mb-0 mt-2 fw-3" style={{ fontSize: "17px" }}>
                {successMessage}
              </p>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="primary mt-3"
                  className="block"
                  onClick={handleCloseModal}
                  style={{
                    padding: "10px 20px",
                    width: "100%",
                    background: "#095f62",
                    border: "none",
                  }}
                >
                  OK
                </Button>
              </div>
            </Modal.Body>
          </Modal>
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
}

export default FormForget;
