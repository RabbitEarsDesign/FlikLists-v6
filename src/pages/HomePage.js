import React, { useState, useEffect } from "react";
import axios from "axios";
// COMPONENTS
import SearchForm from "../components/ui/SearchForm";
import AllMovies from "../components/Movies/AllMovies";

function HomePage() {
  const [movieQuery, setMovieQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const APIKey = "802f68a97cdcaa8aa345257982de424c";
    const timer = setTimeout(() => {
      if (movieQuery !== "") {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${movieQuery}`
          )
          .then((res) => setMovies(res.data.results))
          .catch((err) => console.error(err.message));
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [movieQuery]);

  const movieQueryHandler = (e) => {
    setMovieQuery(e.target.value);
  };

  return (
    <section className="container">
      <SearchForm
        onChange={movieQueryHandler}
        placeholder="Search for your favorite movies"
      />
      <AllMovies movies={movies} />
    </section>
  );
}

export default HomePage;
