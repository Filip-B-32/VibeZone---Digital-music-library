import React, { useEffect, useState } from "react";
import "./details-page.css";
import Modal from "../common/Modal/Modal";

const DetailsPage = ({ isOpen, onClose, item }) => {
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (item && item.id && item.type) {
        let url = "";

        switch (item.type) {
          case "Artist":
            url = `https://localhost:7153/api/VibeZone/getArtist/${item.id}`;
            break;
          case "Album":
            url = `https://localhost:7153/api/VibeZone/getAlbum/${item.id}`;
            break;
          case "Song":
            url = `https://localhost:7153/api/VibeZone/getSong/${item.id}`;
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
  }, [isOpen, item]);

  if (!item) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {itemData && (
        <div>
          <h1>{item.type}</h1>
          {item.type === "Artist" && (
            <>
              <p>Name: {itemData.name}</p>
              {Array.isArray(itemData.albums) && (
                <div>
                  <h2>Albums:</h2>
                  {itemData.albums.map((album) => (
                    <div key={album.id} className="album">
                      <p>Title: {album.title}</p>
                      <p>Description: {album.description}</p>
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
                  ))}
                </div>
              )}
            </>
          )}
          {item.type === "Album" && (
            <>
              <p>Title: {itemData.title}</p>
              <p>Description: {itemData.description}</p>
              <p>Artist: {itemData.artist?.name}</p>
              {Array.isArray(itemData.songs) && itemData.songs.length > 0 && (
                <div className="songs">
                  <h3>Songs:</h3>
                  <ul>
                    {itemData.songs.map((song) => (
                      <li key={song.id}>
                        {song.title} - {song.length}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
          {item.type === "Song" && (
            <>
              <p>Title: {itemData.title}</p>
              <p>Length: {itemData.length}</p>
              <p>Album: {itemData.album?.title}</p>
              <p>Artist: {itemData.album?.artist?.name}</p>
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default DetailsPage;