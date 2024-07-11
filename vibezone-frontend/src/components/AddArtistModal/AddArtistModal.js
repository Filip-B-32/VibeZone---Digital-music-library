import React, { useState } from "react";
import "./add-artist-modal.css";
import Modal from "../common/Modal/Modal";
import CustomButton from "../common/CustomButton/CustomButton";

const AddArtistModal = ({ isOpen, onClose }) => {
  const [artistName, setArtistName] = useState("");
  const [albums, setAlbums] = useState([]);

  const handleArtistNameChange = (e) => setArtistName(e.target.value);

  const handleAddAlbum = () => {
    setAlbums([...albums, { title: "", description: "", songs: [] }]);
  };

  const handleAlbumChange = (index, field, value) => {
    const newAlbums = albums.slice();
    newAlbums[index][field] = value;
    setAlbums(newAlbums);
  };

  const handleAddSong = (albumIndex) => {
    const newAlbums = albums.slice();
    newAlbums[albumIndex].songs.push({ title: "", length: "" });
    setAlbums(newAlbums);
  };

  const handleSongChange = (albumIndex, songIndex, field, value) => {
    const newAlbums = albums.slice();
    newAlbums[albumIndex].songs[songIndex][field] = value;
    setAlbums(newAlbums);
  };

  const validateForm = () => {
    const timePattern = /^([0-5]?[0-9]):([0-5][0-9])$/;

    if (!artistName.trim()) {
      alert("Artist name cannot be empty or just spaces.");
      return false;
    }

    for (let album of albums) {
      if (!album.title.trim() || !album.description.trim()) {
        alert("All album titles and descriptions must be filled out.");
        return false;
      }

      for (let song of album.songs) {
        if (!song.title.trim() || !song.length.trim()) {
          alert("All song titles and lengths must be filled out.");
          return false;
        }

        if (!timePattern.test(song.length)) {
          alert("Song length must be in the format MM:SS.");
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const createArtistDto = {
      name: artistName,
      albums: albums.map((album) => ({
        title: album.title,
        description: album.description,
        songs: album.songs.map((song) => ({
          title: song.title,
          length: song.length,
        })),
      })),
    };

    try {
      const response = await fetch(
        "https://localhost:7153/api/Vibezone/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createArtistDto),
        }
      );

      if (response.ok) {
        alert("Artist created successfully!");
        onClose();
      } else {
        alert("Failed to create artist.");
      }
    } catch (error) {
      console.error("Error creating artist:", error);
    }
  };

  const handleClearData = () => {
    setArtistName("");
    setAlbums([]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="add-artist-modal-content">
        <h2>Add New Artist</h2>
        <div className="form-group">
          <label>Artist Name:</label>
          <input
            type="text"
            value={artistName}
            onChange={handleArtistNameChange}
            required
          />
        </div>
        <div className="albums-container">
          {albums.map((album, albumIndex) => (
            <div key={albumIndex} className="album-section">
              <h3>Album {albumIndex + 1}</h3>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={album.title}
                  onChange={(e) =>
                    handleAlbumChange(albumIndex, "title", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  value={album.description}
                  onChange={(e) =>
                    handleAlbumChange(albumIndex, "description", e.target.value)
                  }
                />
              </div>
              <CustomButton
                title={"Add Song"}
                onClick={() => handleAddSong(albumIndex)}
              />
              {album.songs.map((song, songIndex) => (
                <div key={songIndex} className="song-section">
                  <h4>Song {songIndex + 1}</h4>
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={song.title}
                      onChange={(e) =>
                        handleSongChange(
                          albumIndex,
                          songIndex,
                          "title",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Length:</label>
                    <input
                      type="text"
                      value={song.length}
                      onChange={(e) =>
                        handleSongChange(
                          albumIndex,
                          songIndex,
                          "length",
                          e.target.value
                        )
                      }
                      placeholder="MM:SS"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="button-group">
          <CustomButton title={"Add Album"} onClick={handleAddAlbum} />
          <CustomButton title={"Submit"} onClick={handleSubmit} />
          <CustomButton title={"Clear Data"} onClick={handleClearData} />
        </div>
      </div>
    </Modal>
  );
};

export default AddArtistModal;