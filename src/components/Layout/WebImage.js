import React, { useState, useEffect } from "react";
// CLASSES
import classes from "./WebImage.module.css";

function WebImage(props) {
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    setHasImage(() => true);
    if (props.poster === null) {
      setHasImage(() => false);
    }
  }, [props.poster]);

  let img;

  if (hasImage) {
    img = (
      <img
        src={`https://image.tmdb.org/t/p/w185/${props.poster}`}
        alt="movie_poster"
        className={classes["movie-img"]}
      />
    );
  } else {
    img = <div className={classes["no-poster"]}>No Image for this movie</div>;
  }

  return (
    <div onClick={props.onClick} className={classes.img}>
      {img}
    </div>
  );
}

export default WebImage;
