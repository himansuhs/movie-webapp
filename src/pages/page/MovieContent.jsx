import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../page-css/MovieContent.css";
import MovieContentCard from "../../components/component/MovieContentCard";

const MovieContent = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        const movieData = await movieResponse.json();
        setDetails(movieData);

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        const castData = await castResponse.json();
        setCast(castData.cast.slice(0, 6)); // Limit to 6 cast members
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <>
      <div className="outer-container">
        <div className="main-container">
          <div className="left">
            <div className="top-section">
              <img
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title}
                className="left-image"
              />
              <div className="details">
                <p className="title">{details.title}</p>
                <p className="rating">Rating: {details.vote_average}</p>
                <div className="inner-details">
                  <p className="duration">{details.runtime} mins</p>
                  <p className="genre">
                    {details.genres?.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
                <p className="release-date">
                  Release Date: {details.release_date}
                </p>
              </div>
            </div>

            <div className="overview">
              <h3>Overview</h3>
              <p className="overview-text">{details.overview}</p>
            </div>
          </div>

          <div className="right">
            <img
              src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
              alt={details.title}
              className="right-image"
            />
          </div>
        </div>
      </div>
      <h2>Cast</h2>
      <div className="CastContainer">
        {cast.map((member) => (
          <MovieContentCard
            key={member.cast_id}
            image={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
            name={member.name}
            character={member.character}
          />
        ))}
      </div>
    </>
  );
};

export default MovieContent;
