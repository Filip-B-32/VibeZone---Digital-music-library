import React from 'react';
import "./card.css";

const Card = ({ item }) => {
  return (
    <div className="card-wrapper">
      <h2>{item.name || item.title}</h2>
      <p>{item.genre || item.type}</p>
      <p>{item.description}</p>
      {/* Add other item data fields as needed */}
    </div>
  );
};

export default Card;