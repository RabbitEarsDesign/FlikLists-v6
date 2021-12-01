import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./auth-context";

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const storedLocalId = localStorage.getItem("localId");

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 0) {
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("token");
    localStorage.removeItem("localId");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    localId: storedLocalId,
  };
};

function AuthProvider({ children }) {
  const history = useHistory();

  const tokenData = retrieveStoredToken();

  let initialToken;
  let initialLocalId;
  if (tokenData) {
    initialToken = tokenData.token;
    initialLocalId = tokenData.localId;
  }
  const [token, setToken] = useState(initialToken);
  const [localId, setLocalId] = useState(initialLocalId);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("localId");

    setToken(null);
    setLocalId(null);
    history.replace("/auth");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    console.log("LOGOUT");
  }, [history]);

  const loginHandler = (token, localId, expirationTime) => {
    setToken(token);
    setLocalId(localId);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("localId", localId);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);

    console.log("LOGIN");
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const initialContext = {
    APIKEY: "AIzaSyBuqxeJyN3SQa5OKoTen5TUPNbSSGl2eRk",
    token: token,
    localId: localId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={initialContext}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
