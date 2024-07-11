import React, { useState } from "react";
import "./variant.css";
import CustomButton from "../../common/CustomButton/CustomButton";

const ArtistVariant = ({
  artist,
  onAlbumClick,
  onDeleteArtist,
  onUpdateArtist,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(artist.name);

  const handleDeleteClick = () => {
    if (
      window.confirm(`Are you sure you want to delete artist ${artist.name}?`)
    ) {
      onDeleteArtist(artist.id);
    }
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (newName !== artist.name) {
      onUpdateArtist(artist.id, newName);
    }
  };

  return (
    <div>
      <div className="flex-container">
        <p className="name-paragraph">
          Name:{" "}
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameBlur();
              }}
              autoFocus
            />
          ) : (
            <span className="name">{artist.name}</span>
          )}
        </p>
        {!isEditing && (
          <CustomButton title="Edit" onClick={handleUpdateClick} />
        )}
      </div>
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
      <br />
      <CustomButton title="Delete Artist" onClick={handleDeleteClick} />
    </div>
  );
};

export default ArtistVariant;