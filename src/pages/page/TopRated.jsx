import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../page-css/NavContent.css";
import Card from "../../components/component/Card";
import restartIcon from "../../assets/restart.svg";

export const TopRated = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1); // State to manage the current page
  const [moreAvailable, setMoreAvailable] = useState(true); // State to check if more movies are available
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
        );
        const data = await response.json();
        if (page === 1) {
          setMoviesList(data.results); // Set movies on the first page load
        } else {
          setMoviesList((prev) => [...prev, ...data.results]); // Append new movies to the existing list
        }
        setMoreAvailable(data.page < data.total_pages); // Check if there are more pages
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchMovies();
  }, [page]); // Fetch movies when page changes

  const navigateToMovie = (id) => {
    navigate(`/movie/${id}`); // Navigate to the selected movie
  };

  const loadMoreMovies = () => {
    if (moreAvailable) {
      setPage((prev) => prev + 1); // Load next page
    }
  };

  return (
    <div className="popular-container">
      {moviesList.map((movie) => (
        <div key={movie.id} onClick={() => navigateToMovie(movie.id)}>
          <Card
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average}
          />
        </div>
      ))}
      {moreAvailable && (
        <button onClick={loadMoreMovies}>
          <img src={restartIcon} alt="Refresh Icon" className="refresh-icon" />
        </button>
      )}
    </div>
  );
};
