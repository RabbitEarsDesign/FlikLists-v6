import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
// HOOKS
import useHttp from "../../hooks/use-http";
// COMPONENTS
import FormControl from "../ui/FormControl";
// CSS
import classes from "./AuthForm.module.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const { sendRequest, isLoading, error } = useHttp();

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
  };

  const applyData = (data) => {
    console.log(data);
    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    authContext.login(data.idToken, data.localId, expirationTime.toISOString());
    history.replace("/home");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = e.target[0].value;
    const enteredPassword = e.target[1].value;

    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${authContext.APIKEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authContext.APIKEY}`;
    }

    sendRequest(
      {
        url: url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
      },
      applyData
    );
  };

  const verifyEmail = (value) => {
    return value.includes("@");
  };

  const verifyPassword = (value) => {
    return value.trim().length >= 6;
  };

  return (
    <div className={classes.auth}>
      {error ? <p className={classes["error-text"]}>{error}</p> : null}
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <form onSubmit={submitHandler}>
        <FormControl
          type="email"
          label="Enter Email"
          id="email"
          errorMsg="Email must contain @"
          verifyFunc={verifyEmail}
        />

        <FormControl
          type="password"
          label="Enter Password"
          id="password"
          errorMsg="Password must be longer than 6 chars"
          verifyFunc={verifyPassword}
        />
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <button>Loading...</button>}
          <button
            onClick={switchAuthModeHandler}
            className={classes.toggle}
            type="button"
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
