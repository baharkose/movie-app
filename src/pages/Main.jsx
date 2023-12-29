import React from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { useAuthContext } from "../context/AuthContext";

const Main = () => {
  const {movies, loading} = useMovieContext();
  const {currentUser} = useAuthContext()
  return <div className="flex flex-wrap justify-center">
    {
    loading ? (
      <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
    ): (
     movies.map(movie=>
      <MovieCard key={movie.id} {...movie}/>
      ) 
    )}
    
  </div>;
};

export default Main;
