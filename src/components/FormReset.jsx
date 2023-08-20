import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import correct from "/correct.png";
import "./Register.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import dog from "/Group 11.png";
import dogHappy from "/Group 12.png";

function FormReset() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let timer;
    if (error) {
      setShowError(true);
      timer = setTimeout(() => {
        setError("");
        setShowError(false);
      }, 3000); // Waktu penundaan, dalam milidetik (di sini 5000ms atau 5 detik)
    }
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = searchParams.get("token");
    setToken(tokenFromUrl);
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/user/reset-password",
        {
          password,
          token,
        }
      );
      // Handle successful response
      setIsSuccess(true);
    } catch (error) {
      setError("Invalid email or password");
    }

    setIsLoading(false); // Stop loading
  };

  const passwordInputType = passwordVisible ? "text" : "password";

  const handleModalClose = () => {
    setIsSuccess(false);
  };

  const style = `.error-message {
    color: white;
    margin-top: 7px
    margin-bottom: 10px;
  }
  
  .fade-out {
    animation: fadeOut 3s ease-out;
    animation-fill-mode: forwards;
  }
  
  /* Animasi fade-out */
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }`;
  return (
    <>
      <style>{style}</style>
      <div className="container-fluid d-flex flex-column justify-content-end align-items-center vh-100">
        <div className="row justify-content-end">
          <div className="col-md-5 pt-3 ms-2 me-xxl-5 ps-xxl-4 ">
            <h1 className="reset fw-bold">Reset Password</h1>

            <form onSubmit={handleSubmit}>
              <div className="d-flex input-pw mt-4">
                <div>
                  <p style={{ marginBottom: "0px" }}>Masukkan Password Baru</p>
                </div>
              </div>
              <div className="input-group mb-2 mt-1">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Masukkan password"
                  aria-label="Password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  style={{ fontFamily: "Segoe UI, sans-serif" }}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEye : faEyeSlash}
                  />
                </span>
              </div>
              {/* Display error message */}
              <div className="d-flex input-pw mt-4">
                <div>
                  <p style={{ marginBottom: "0px" }}>Ulangi Password Baru</p>
                </div>
              </div>
              <div className="input-group mb-2 mt-1">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Masukkan password"
                  aria-label="Password"
                  className="form-control"
                  // value={password}
                  // onChange={(e) => e.preventDefault}
                  required
                  style={{ fontFamily: "Segoe UI, sans-serif" }}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEye : faEyeSlash}
                  />
                </span>
              </div>
              {/* {error && <p className="error-message">{error}</p>}{" "} */}
              {showError && (
                <Button
                  variant="danger"
                  className="btn btn-primary lg sign-up fw-bold"
                  onClick={() => setError("")}
                  style={{
                    fontSize: "13px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {error}
                </Button>
              )}
              <div className="d-grid gap-2 mt-5">
                <button
                  className="btn btn-primary lg sign-up fw-bold"
                  type="submit"
                >
                  Save Change
                </button>
              </div>
            </form>

            <Modal centered show={isSuccess} onHide={handleModalClose}>
              <Modal.Body className="text-center m-3">
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Successful Change Password
                </p>
                <img
                  src={dogHappy}
                  alt="correct"
                  className="img-fluid mt-3 mb-4 mx-auto d-block"
                  style={{ width: "30%" }}
                />{" "}
                <p>Click OK to login.</p>
                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="primary mt-3"
                    className="block"
                    style={{
                      padding: "10px 20px",
                      width: "100%",
                      background: "#095f62",
                      border: "none",
                    }}
                    as={Link}
                    to="/"
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
    </>
  );
}

export default FormReset;
