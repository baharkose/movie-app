import React from "react";
import { useMovieContext } from "../context/MovieContext";

const Main = () => {
  const {movies, loading} = useMovieContext();
  return <>
    {movies.map(movie=><p>{movie.id}</p>)}
  </>;
};

export default Main;
