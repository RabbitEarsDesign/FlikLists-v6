import React from "react";

// CLASSES
import classes from "./SearchForm.module.css";

function SearchForm(props) {
  return (
    <div className={classes.search}>
      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder={props.placeholder}
          onKeyUp={props.onChange}
        />
      </form>
    </div>
  );
}

export default SearchForm;
