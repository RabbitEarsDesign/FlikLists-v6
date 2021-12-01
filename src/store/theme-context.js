import React from "react";

const initialContext = {
  dark: false,
  toggleTheme: () => {},
};

const ThemeContext = React.createContext(initialContext);

export default ThemeContext;
