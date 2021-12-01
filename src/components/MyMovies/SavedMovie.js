import React from "react";
// COMPONENTS
import Button from "../ui/Button";
import WebImage from "../Layout/WebImage";
import Card from "../Layout/Card";
// CSS
import classes from "./SavedMovie.module.css";

function SavedMovie(props) {
  const img = `https://image.tmdb.org/t/p/w185/${props.source}`;
  const releaseDate = new Date(props.release).getFullYear();

  return (
    <li className={classes.movieItem}>
      <div className={classes.imageContainer}>
        <img src={img} alt="Movie poster" />
      </div>
      <div className={classes.detailsContainer}>
        <h2>{props.title}</h2>
        <div className={classes.flex2}>
          {" "}
          <p>{releaseDate}</p>
          <p>{props.rating}</p>
          <p>{props.review}</p>
        </div>

        <p>{props.overview}</p>
        <div className={classes.movieControl}>
          <Button>Watch Trailer</Button>
          <Button>Remove</Button>
        </div>
      </div>
    </li>
  );
}

export default SavedMovie;

{
  /* <li className={classes.flex}>
      <WebImage poster={props.poster} />
      <div className={classes["movie-info"]}>
        <h1 className={classes.movie}>{props.title}</h1>
        <div className={classes["movie-runtime-date"]}>
          <p>{releaseDate}</p>
        </div>
        <h3>{props.overview}</h3>
        {/* {props.button && (
          <Button onClick={removeFromListHandler} className={classes.flex1}>
            {isLoading && "Removing..."}
            {!isLoading && !removed && "Remove"}
            {!isLoading && removed && "Movie Removed!"}
          </Button>
        )} */
}
// </div>
// </li> */}
