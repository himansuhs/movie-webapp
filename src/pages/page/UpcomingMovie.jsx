import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../page-css/NavContent.css";
import Card from "../../components/component/Card";
import restartIcon from "../../assets/restart.svg";

export const UpcommingMovie = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`
        );
        const data = await response.json();

        setMovies((prevMovies) =>
          currentPage === 1 ? data.results : [...prevMovies, ...data.results]
        );

        setHasMore(data.page < data.total_pages);
      } catch (error) {
        console.error("Error fetching the upcoming movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handleMovieClick = (id) => navigate(`/movie/${id}`);

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="popular-container">
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => handleMovieClick(movie.id)}>
          <Card
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average}
          />
        </div>
      ))}
      {hasMore && (
        <button onClick={handleLoadMore}>
          <img src={restartIcon} alt="Load More" className="refresh-icon" />
        </button>
      )}
    </div>
  );
};
