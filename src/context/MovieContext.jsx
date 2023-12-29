import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext();
export const useMovieContext = () => {
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({ children }) => {
    useEffect(()=>{
        getMovies()
    }, [])
    // - ilk açılışta gelmesini istediğimiz için useEffect kullandık. 
  const getMovies = () => {
    axios
      .get(FEATURED_API)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return <MovieContext.Provider value={null}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;

// - burayı da sarmallamayı unutmamalıyız.
