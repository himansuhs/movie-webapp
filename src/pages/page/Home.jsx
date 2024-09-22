import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/component/Card";
import "../page-css/Home.css";
import { IoMdRefresh } from "react-icons/io";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const getQuery = () =>
    new URLSearchParams(location.search).get("query") || "";

  const fetchMovies = async (page) => {
    const query = getQuery();
    const apiUrl = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMovies((prev) => [...prev, ...data.results]);
      setHasMoreMovies(page < data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [location, currentPage]);

  const handleMovieClick = (id) => navigate(`/movie/${id}`);

  const handleLoadMore = () => {
    if (hasMoreMovies) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="Home-container">
      {movies.length ? (
        movies.map((movie) => (
          <Card
            key={movie.id}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average}
            onClick={() => handleMovieClick(movie.id)}
          />
        ))
      ) : (
        <p>No movies found.</p>
      )}
      {hasMoreMovies && (
        <button className="load-more-button" onClick={handleLoadMore}>
          <IoMdRefresh />
        </button>
      )}
    </div>
  );
};

export default Home;
