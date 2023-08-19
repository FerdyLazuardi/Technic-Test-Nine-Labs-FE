import React from "react";
import { Toaster } from "react-hot-toast";
import AppContent from "../components/AppContent";
import AppHeader from "../components/AppHeader";
import PageTitle from "../components/PageTitle";
import styles from "../styles/modules/app.module.scss";
import jwt_decode from "jwt-decode";

function TodoPage() {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const user_name = decodedToken.name;

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <div className="container">
        <PageTitle>TODO List</PageTitle>

        <div className={styles.app__wrapper}>
          <p className="mb-5 text-center">
            Hi, {user_name}! Enjoy using the application. When you're done
            exploring, you can{" "}
            <a className="fw-bold" href="/" onClick={handleLogout}>
              Log Out
            </a>
          </p>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default TodoPage;
