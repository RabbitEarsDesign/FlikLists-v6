import React from "react";
// CSS
import classes from "./Button.module.css";

function Button(props) {
  return (
    <button
      className={`${classes.button} ${props.classes}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
