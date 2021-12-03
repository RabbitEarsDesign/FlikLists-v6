import React, { useEffect, useState, useContext, useCallback } from "react";
import AuthContext from "../../store/auth-context";
// HOOKS
import useHttp from "../../hooks/use-http";
// COMPONENTS
import SavedMovie from "./SavedMovie";
import Card from "../Layout/Card";
// CSS
import classes from "./MyList.module.css";

function MyList() {
  const authContext = useContext(AuthContext);

  const [movies, setMovies] = useState([]);

  const { sendRequest, isLoading, error } = useHttp();

  const applyData = useCallback((data) => {
    let loadedMovies = [];
    console.log(data);
    for (const key in data) {
      loadedMovies.push({
        title: data[key].title,
        release_date: data[key].release_date,
        runtime: data[key].runtime,
        poster: data[key].poster,
        overview: data[key].overview,
        rating: data[key].rating,
        review: data[key].review,
        id: key,
      });
    }

    setMovies(loadedMovies);
  }, []);

  useEffect(() => {
    sendRequest(
      {
        url: `https://fliklists-default-rtdb.firebaseio.com/movies/${authContext.localId}.json`,
      },
      applyData
    );
  }, [applyData, authContext.localId, sendRequest]);
  console.log(movies);

  const removeMovieHandler = (id) => {
    sendRequest({
      method: "DELETE",
      url: `https://fliklists-default-rtdb.firebaseio.com/movies/${authContext.localId}/${id}.json`,
    });
  };

  const myMovies = movies.map((movie) => {
    return (
      <SavedMovie
        data={movie}
        key={movie.id}
        id={movie.id}
        // length={}
        release={movie.release_date}
        lang={movie.original_language}
        rating={movie.rating}
        review={movie.review}
        source={movie.poster}
        title={movie.title}
        overview={movie.overview}
        button={true}
        removeMovie={removeMovieHandler}
      />
    );
  });

  return <ul className={classes.myMovies}>{myMovies}</ul>;
}

export default MyList;
