import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext();
export const useMovieContext = () => {
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getMovies();
  }, []);
  // - ilk açılışta gelmesini istediğimiz için useEffect kullandık.
  const getMovies = () => {
    setloading(true);
    axios
      .get(FEATURED_API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  };
  return (
    <MovieContext.Provider value={{ movies, loading }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;

// - burayı da sarmallamayı unutmamalıyız.
