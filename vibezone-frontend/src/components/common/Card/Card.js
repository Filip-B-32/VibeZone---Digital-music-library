import React from "react";
import "./card.css";

const Card = ({ item }) => {
  return (
    <div className="a-box">
      <div className="img-container">
        <div className="img-inner">
          <div className="inner-skew">
            <img
              src={
                item.type === "Artist"
                  ? "https://www.careersinmusic.com/wp-content/uploads/2019/03/recording-artist.jpg"
                  : item.type === "Album"
                  ? "https://media.istockphoto.com/id/536669874/es/foto/%C3%A1lbum-de-vinilo-blanco-cubierta-de-funda-bosquejo-aislado-m%C3%A1scara-de-recorte.jpg?b=1&s=612x612&w=0&k=20&c=D72aFz9MEkibISm-EIZrH68k1GT21BQhYOEU0rN-39M="
                  : "https://hub.yamaha.com/wp-content/uploads/2021/09/How-vinyl-made-Fig.-2.jpg"
              }
              alt={item.type}
            />
          </div>
        </div>
      </div>
      <div className="text-container">
        <h2>{item.name || item.title}</h2>
        <h3>{item.type}</h3>
        {item.type === "Album" && (
          <div>
            <p className="card-info">
              Artist: <span className="card-info-name">{item.artistName}</span>
            </p>
          </div>
        )}
        {item.type === "Song" && (
          <div>
            <p className="card-info">
              Artist: <span className="card-info-name">{item.artistName}</span>
            </p>
            <p className="card-info">
              Album: <span className="card-info-name">{item.albumName}</span>
            </p>
          </div>
        )}
        <br></br>
        <button class="space-btn">See details</button>
      </div>
    </div>
  );
};

export default Card;
