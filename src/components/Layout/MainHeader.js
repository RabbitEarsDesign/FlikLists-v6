import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

// COMPONENTS
import img from "../../logo.png";
import Button from "../ui/Button";
// CSS
import classes from "./MainHeader.module.css";
// STORE
import AuthContext from "../../store/auth-context";
import ThemeContext from "../../store/theme-context";

function MainHeader() {
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const history = useHistory();

  const clickHandler = () => {
    if (authContext.isLoggedIn) {
      authContext.logout();
    } else {
      history.push("/auth");
    }
  };

  const toggleModeHandler = () => {
    themeContext.toggle();
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.flex}>
          {authContext.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/list">
                My List
              </NavLink>
            </li>
          )}
          <li>
            <NavLink activeClassName={classes.active} to="/home">
              Movies
            </NavLink>
          </li>
        </ul>
        <div className={classes.flex}>
          <div className={classes.img} onClick={toggleModeHandler}>
            <img src={img} alt="" />
          </div>
        </div>
        <ul className={classes.flex}>
          <li>
            <NavLink activeClassName={classes.active} to="/user">
              User
            </NavLink>
          </li>
          <li>
            <Button onClick={clickHandler}>
              {authContext.isLoggedIn ? "Logout" : "Login"}
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
