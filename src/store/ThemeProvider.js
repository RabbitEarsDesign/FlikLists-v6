import React, { useState } from "react";
import ThemeContext from "./theme-context";

function ThemeProvider(props) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((prevState) => !prevState);
  };

  if (dark) {
    document.querySelector("html").classList.add("dark");
  } else {
    document.querySelector("html").classList.remove("dark");
  }

  const initialContext = {
    dark: dark,
    toggle: toggleTheme,
  };

  return (
    <ThemeContext.Provider value={initialContext}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
