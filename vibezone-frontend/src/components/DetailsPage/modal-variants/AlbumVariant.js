import React from "react";
import "./variant.css";

const AlbumVariant = ({ album, onArtistClick }) => {
  return (
    <div>
      <p className="name-paragraph">
        Title: <span className="name">{album.title}</span>
      </p>
      <p>{album.description}</p>
      <p>
        Artist:{" "}
        <a
          className="data-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onArtistClick(album.artist.id);
          }}
        >
          {album.artist?.name}
        </a>
      </p>
      {Array.isArray(album.songs) && album.songs.length > 0 && (
        <div className="songs">
          <h3>Songs:</h3>
          <ul>
            {album.songs.map((song) => (
              <li key={song.id}>
                {song.title} - {song.length}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlbumVariant;