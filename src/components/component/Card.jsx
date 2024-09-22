import React from "react";
import "../css/Card.css";

const Card = ({ image, title, rating, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      {" "}
      {/* Attach the onClick handler here */}
      <img src={image} alt={title} className="movies_image" />
      <div className="movies_info">
        <h4 className="movies_title">{title}</h4>
        <p className="movies_rating">Rating: {rating}</p>
      </div>
    </div>
  );
};

export default Card;
