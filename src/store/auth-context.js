import React from "react";

const initialContext = {
  APIKEY: "AIzaSyBuqxeJyN3SQa5OKoTen5TUPNbSSGl2eRk",
  token: "",
  localId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
};

const AuthContext = React.createContext(initialContext);

export default AuthContext;
