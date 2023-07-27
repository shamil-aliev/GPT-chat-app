import { useState } from "react";

import supabase from "../config/supabaseClient";
import styles from "../styles/AuthForm.module.css";
import image from "../img/main.png";

function AuthForm({ setUserId, setIsLogged }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const [info, setInfo] = useState("");

  // TEST STATES

  // Here I get user's credentials for further use

  const handleLogin = () => {
    // Save the authentication data to the browser storage
    localStorage.setItem("authData", "loggedIn");
    // Set the user as logged in
    setIsLogged(true);
  };

  // LOGIN FUNCTIONALITY

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isValidEmail(loginEmail)) {
        setLoginError("Please enter a valid email address");
        return;
      }

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: loginEmail, // SB will check if entered values match the stored values in storage
          password: loginPassword,
        });

      if (data.user) {
        // console.log("Login successful:", data); // Here will be all the data about the user

        handleLogin();
      }

      if (signInError) {
        console.error("Login error:", signInError);
        setLoginError(signInError.message); // Assuming the error object has a 'message' property
      }
    } catch (catchError) {
      console.error("Error:", catchError);
    } finally {
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  // SIGNUP FUNCTIONALITY
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isValidEmail(signupEmail)) {
        setSignupError("Please enter a valid email address");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: signupEmail, // SB will store entered values as email and password and use it for further log in
        password: signupPassword,
      });
      setInfo(
        "Confirmation link was sent to your email. Please confirm your account"
      );
      // CODE BELOW IS TO REMOVE. USEID STATE WILL RESET ON REFRESH. CHANCHE WITH LOCAL STORAGE
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log([user?.email, user?.id]); // user's email & id
      setUserId(user.id);
      console.log(`User ID: ${user.id}`);

      console.log([data.user.email, data.user.id]); // user's email & id
      setUserId(data.user.id);

      // Don't remove handleLogin func!
      handleLogin();

      if (error) {
        console.error("Signup error:", error.message);
        // TODO: Handle signup error (display error message, etc.)
      }
    } catch (error) {
      console.error("Error:", error);
      setSignupError("");
      // TODO: Handle other errors (network error, etc.)
    } finally {
      setSignupEmail("");
      setSignupPassword("");
    }

    // TODO: Handle signup submission logic here
    console.log("Signing up...");
  };

  const isLoginDisabled = !loginEmail || loginPassword.length < 6;
  const isSignupDisabled = !signupEmail || signupPassword.length < 6;

  const isValidEmail = (email) => {
    // A simple email validation regex pattern
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <div className={styles["auth-form-container"]}>
      <div className={styles["image-box"]}>
        <img src={image} alt="boy and girl" className={styles.image} />
      </div>
      <form onSubmit={handleLoginSubmit}>
        {/* Login Form */}
        <input
          placeholder="Email"
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          className={styles.input}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          className={styles.input}
        />

        {loginError && <p className={styles.error}>{loginError}</p>}
        <br />
        <button type="submit" className={styles.btn} disabled={isLoginDisabled}>
          Login
        </button>
      </form>
      <br />
      <p className={styles.info}>or sign up if you don’t have an account yet</p>
      <form onSubmit={handleSignupSubmit}>
        {/* Signup Form */}
        <input
          placeholder="Email"
          type="email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          className={styles.input}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
          className={styles.input}
        />
        {signupError && <p className={styles.error}>{signupError}</p>}
        <br />
        <button
          type="submit"
          className={styles.btn}
          disabled={isSignupDisabled}>
          Sign Up
        </button>
      </form>
      {info ? (
        <p style={{ fontSize: "16px", marginTop: "12px", color: "#0085ff" }}>
          {info}
        </p>
      ) : null}
    </div>
  );
}

export default AuthForm;
