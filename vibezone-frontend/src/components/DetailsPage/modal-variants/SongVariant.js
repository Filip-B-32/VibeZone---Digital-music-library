import React, { useState } from "react";
import "./variant.css";
import CustomButton from "../../common/CustomButton/CustomButton";

const SongVariant = ({ song, onAlbumClick, onArtistClick, onUpdateSong }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(song.title);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (newTitle !== song.title) {
      onUpdateSong(song.id, newTitle);
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
            <span className="name">{song.title}</span>
          )}
        </p>
        {!isEditing && (
          <>
            <br></br>
            <CustomButton title="Edit" onClick={handleUpdateClick} />
          </>
        )}
      </div>
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
