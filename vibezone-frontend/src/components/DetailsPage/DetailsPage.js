import React, { useEffect, useState } from "react";
import "./details-page.css";
import Modal from "../common/Modal/Modal";
import ArtistVariant from "./modal-variants/ArtistVariant";
import AlbumVariant from "./modal-variants/AlbumVariant";
import SongVariant from "./modal-variants/SongVariant";

const DetailsPage = ({ isOpen, onClose, item }) => {
  const [itemData, setItemData] = useState(null);
  const [currentItem, setCurrentItem] = useState(item);

  useEffect(() => {
    const fetchData = async () => {
      if (currentItem && currentItem.id && currentItem.type) {
        let url = "";

        switch (currentItem.type) {
          case "Artist":
            url = `https://localhost:7153/api/VibeZone/getArtist/${currentItem.id}`;
            break;
          case "Album":
            url = `https://localhost:7153/api/VibeZone/getAlbum/${currentItem.id}`;
            break;
          case "Song":
            url = `https://localhost:7153/api/VibeZone/getSong/${currentItem.id}`;
            break;
          default:
            break;
        }

        if (url) {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            // album and song extraction from $values
            const data = {
              ...result,
              albums: result.albums ? result.albums.$values || [] : [],
              songs: result.songs ? result.songs.$values || [] : [],
            };
            setItemData(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, currentItem]);

  const handleAlbumClick = (albumId) => {
    setCurrentItem({ id: albumId, type: "Album" });
  };

  const handleArtistClick = (artistId) => {
    setCurrentItem({ id: artistId, type: "Artist" });
  };

  const handleUpdateArtist = async (artistId, newName) => {
    try {
      const response = await fetch(
        "https://localhost:7153/api/VibeZone/update/artist",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: artistId, newName }),
        }
      );

      if (response.ok) {
        setItemData((prevData) => ({
          ...prevData,
          name: newName,
        }));
      } else {
        console.error("Failed to update artist name");
      }
    } catch (error) {
      console.error("Error updating artist name:", error);
    }
  };

  const handleUpdateAlbum = async (albumId, newTitle) => {
    try {
      const response = await fetch(
        "https://localhost:7153/api/VibeZone/update/album",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: albumId, newTitle }),
        }
      );

      if (response.ok) {
        setItemData((prevData) => ({
          ...prevData,
          title: newTitle,
        }));
      } else {
        console.error("Failed to update album title");
      }
    } catch (error) {
      console.error("Error updating album title:", error);
    }
  };

  const handleUpdateSong = async (songId, newTitle) => {
    try {
      const response = await fetch(
        "https://localhost:7153/api/VibeZone/update/song",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: songId, newTitle }),
        }
      );

      if (response.ok) {
        setItemData((prevData) => ({
          ...prevData,
          title: newTitle,
        }));
      } else {
        console.error("Failed to update song title");
      }
    } catch (error) {
      console.error("Error updating song title:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {itemData && currentItem.type === "Artist" && (
        <ArtistVariant
          artist={itemData}
          onAlbumClick={handleAlbumClick}
          onUpdateArtist={handleUpdateArtist}
        />
      )}
      {itemData && currentItem.type === "Album" && (
        <AlbumVariant
          album={itemData}
          onArtistClick={handleArtistClick}
          onUpdateAlbum={handleUpdateAlbum}
        />
      )}
      {itemData && currentItem.type === "Song" && (
        <SongVariant
          song={itemData}
          onAlbumClick={handleAlbumClick}
          onArtistClick={handleArtistClick}
          onUpdateSong={handleUpdateSong}
        />
      )}
    </Modal>
  );
};

export default DetailsPage;