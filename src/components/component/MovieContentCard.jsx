import React from "react";
import "../css/MovieContentCard.css";

const MovieContentCard = ({ image, name, character }) => {
  return (
    <div className="cast_card">
      <img src={image} alt={name} className="cast_image" />
      <div className="cast_info">
        <p className="cast_name">{name}</p>
        <p className="cast_character">{character}</p>
      </div>
    </div>
  );
};

export default MovieContentCard;
