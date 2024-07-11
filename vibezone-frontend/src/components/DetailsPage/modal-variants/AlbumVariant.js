import React, { useState } from "react";
import "./variant.css";
import CustomButton from "../../common/CustomButton/CustomButton";

const AlbumVariant = ({ album, onArtistClick, onUpdateAlbum }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(album.title);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (newTitle !== album.title) {
      onUpdateAlbum(album.id, newTitle);
    }
  };

  return (
    <div>
      <div className="flex-container">
        <p className="name-paragraph">
          Title:{" "}
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTitleBlur();
              }}
              autoFocus
            />
          ) : (
            <span className="name">{album.title}</span>
          )}
        </p>
        {!isEditing && (
          <>
            <br></br>
            <CustomButton title="Edit" onClick={handleUpdateClick} />
          </>
        )}
      </div>
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
