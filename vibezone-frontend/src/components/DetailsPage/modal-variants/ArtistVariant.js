import React from "react";
import "./variant.css";

const ArtistVariant = ({ artist, onAlbumClick }) => {
  return (
    <div>
      <p className="name-paragraph">
        Name: <span className="name">{artist.name}</span>
      </p>
      {Array.isArray(artist.albums) && (
        <div>
          <h2 className="title-subvariant">Albums:</h2>
          {artist.albums.map((album) => (
            <div key={album.id} className="album">
              <p>
                Title:{" "}
                <a
                  className="data-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onAlbumClick(album.id);
                  }}
                >
                  {album.title}
                </a>
              </p>
              <span className="album-description">{album.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistVariant;