import React from "react";
import "./variant.css";

const SongVariant = ({ song, onAlbumClick, onArtistClick }) => {
  return (
    <div>
      <p className="name-paragraph">
        Title: <span className="name">{song.title}</span>
      </p>
      <p>Length: {song.length}</p>
      <p>
        Album:{" "}
        <a
          className="data-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onAlbumClick(song.album.id);
          }}
        >
          {song.album?.title}
        </a>
      </p>
      <p>
        Artist:{" "}
        <a
          className="data-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onArtistClick(song.album.artist.id);
          }}
        >
          {song.album?.artist?.name}
        </a>
      </p>
    </div>
  );
};

export default SongVariant;