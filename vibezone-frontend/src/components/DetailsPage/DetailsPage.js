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

  const handleClose = () => {
    setCurrentItem(null);
    setItemData(null);
    onClose();
  };

  if (!currentItem) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {itemData && (
        <div className="variant-wrapper">
          <h1 className="type-title">{currentItem.type}</h1>
          {currentItem.type === "Artist" && (
            <ArtistVariant artist={itemData} onAlbumClick={handleAlbumClick} />
          )}
          {currentItem.type === "Album" && (
            <AlbumVariant album={itemData} onArtistClick={handleArtistClick} />
          )}
          {currentItem.type === "Song" && (
            <SongVariant
              song={itemData}
              onAlbumClick={handleAlbumClick}
              onArtistClick={handleArtistClick}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default DetailsPage;