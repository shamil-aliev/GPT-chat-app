import styles from "../styles/Logout.module.css";
import React from "react";

function Logout({ setIsLogged, setUserInput }) {
  // Logout Button functionality
  const handleLogout = () => {
    // Clear the authentication data from the browser storage
    localStorage.removeItem("authData");
    // Set the user as logged out
    setIsLogged(false);
    setUserInput(""); // clear user input on logout
  };
  return (
    <button onClick={handleLogout} className={styles.logout}>
      Logout
    </button>
  );
}

export default Logout;
