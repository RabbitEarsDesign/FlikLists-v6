import React, { useState, useContext } from "react";
// CONTEXT
import AuthContext from "../../store/auth-context";
// HOOKS
import useHttp from "../../hooks/use-http";
// COMPONENTS
import Button from "../ui/Button";
import WebImage from "../Layout/WebImage";
import Card from "../Layout/Card";
// CSS
import classes from "./SavedMovie.module.css";

function SavedMovie(props) {
  const authContext = useContext(AuthContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();

  const img = `https://image.tmdb.org/t/p/w185/${props.source}`;
  const releaseDate = new Date(props.release).getFullYear();

  const removeMovieHandler = () => {
    sendRequest({
      method: "DELETE",
      url: `https://fliklists-default-rtdb.firebaseio.com/movies/${authContext.localId}/${props.id}.json`,
    });
    setIsDeleted(true);
  };

  // return (
  //   <li className={classes.movieItem}>
  //     <div className={classes.imageContainer}>
  //       <img src={img} alt="Movie poster" />
  //     </div>
  //     <div className={classes.detailsContainer}>
  //       <h2>{props.title}</h2>
  //       <div className={classes.flex2}>
  //         {" "}
  //         <p>{releaseDate}</p>
  //         <p>{props.rating}</p>
  //         <p>{props.review}</p>
  //       </div>

  //       <p>{props.overview}</p>
  //       <div className={classes.movieControl}>
  //         {/* <Button>Watch Trailer</Button> */}
  //         <Button onClick={removeMovieHandler}>Remove</Button>
  //       </div>
  //     </div>
  //   </li>
  // );
  if (isDeleted) {
    return null;
  } else {
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
            {/* <Button>Watch Trailer</Button> */}
            <Button onClick={removeMovieHandler}>Remove</Button>
          </div>
        </div>
      </li>
    );
  }
}

export default SavedMovie;
