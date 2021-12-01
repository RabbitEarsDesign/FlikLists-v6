import React from "react";
// COMPONENTS
import Movie from "./Movie";
// CLASSES
import classes from "./AllMovies.module.css";

function AllMovies(props) {
  return (
    <ul className={classes["searched-movies"]}>
      {props.movies.map((movie) => {
        return (
          <Movie
            data={movie}
            key={movie.id}
            id={movie.id}
            // length={}
            release={movie.release_date}
            lang={movie.original_language}
            rating={movie.vote_average}
            review={movie.vote_count}
            source={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            // getMovie={getMovieHandler}
          ></Movie>
        );
      })}
    </ul>
  );
}

export default AllMovies;
