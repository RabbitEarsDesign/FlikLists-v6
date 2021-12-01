import React, { useState, useContext } from "react";
// STORE
import AuthContext from "../../store/auth-context";
// COMPONENTS
import Button from "../ui/Button";
import WebImage from "../Layout/WebImage";
import Card from "../Layout/Card";
import Spinner from "../ui/Spinner";
// HOOKS
import useHttp from "../../hooks/use-http";
// CLASSES
import classes from "./Movie.module.css";

function Movie(props) {
  const { release, lang, rating, review, source, title } = props;

  const [movieAdded, setMovieAdded] = useState(false);

  const authContext = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();

  const setMovie = () => {
    setMovieAdded(true);
  };

  const addToListHandler = () => {
    if (!authContext.isLoggedIn) {
      alert("Login to save movies!");
    } else {
      sendRequest(
        {
          method: "POST",
          url: `https://fliklists-default-rtdb.firebaseio.com/movies/${authContext.localId}.json`,
          body: {
            title: props.data.original_title,
            poster: props.data.poster_path,
            release_date: props.data.release_date,
            runtime: props.data.runtime,
            overview: props.data.overview,
            rating: props.rating,
            review: props.review,
          },
        },
        setMovie
      );

      if (error) {
        alert(error);
      }
    }
  };

  const img = `https://image.tmdb.org/t/p/w185/${source}`;
  const releaseDate = new Date(release).getFullYear();

  const addBtn = !movieAdded ? (
    <button onClick={addToListHandler}>{isLoading ? <Spinner /> : "+"}</button>
  ) : (
    <h6>Added</h6>
  );

  return (
    <Card>
      <li className={classes.movie}>
        <div className={classes["imageContainer"]}>
          <img src={img} alt="Movie Poster" />
          <div className={classes.btn}>
            {!movieAdded && (
              <button onClick={addToListHandler}>
                {isLoading ? <div className={classes.loading}></div> : "+"}
              </button>
            )}
            {movieAdded && <h6>added</h6>}
          </div>
        </div>
        <div className={classes.detailsContainer}>
          <div className={classes.detailsTop}>
            <div className={classes.flex1}>
              <div className={classes.smallImageContainer}>
                <img src={img} alt="Movie Poster" />
              </div>
            </div>
            <div className={classes.flex2}>
              <h2 className={classes.title}>{title}</h2>
              {/* Insert Stars here */}
            </div>
          </div>
          <div className={`${classes.grid} ${classes.detailsBottom}`}>
            <div className={classes["grid-item"]}>
              <p>Release</p>
              <h6>{releaseDate}</h6>
            </div>

            <div className={classes["grid-item"]}>
              <p>Lang</p>
              <h6>{lang}</h6>
            </div>

            <div className={classes["grid-item"]}>
              <p>Rating</p>
              <h6>{rating}</h6>
            </div>

            <div className={classes["grid-item"]}>
              <p>Reviews</p>
              <h6>{review}</h6>
            </div>
          </div>
        </div>
      </li>
    </Card>
  );
}

export default Movie;
