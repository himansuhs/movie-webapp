import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../page-css/NavContent.css";
import Card from "../../components/component/Card";

import restartIcon from "../../assets/restart.svg";

export const Popular = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  const [moreAvailable, setMoreAvailable] = useState(true);

  const navigate = useNavigate();

  const fetchMovies = async (pageNumber) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${pageNumber}`
      );
      const data = await response.json();
      setMoviesList((prev) => [...prev, ...data.results]); // Append new movies to existing ones
      setMoreAvailable(data.page < data.total_pages); // Check if there are more pages
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

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
