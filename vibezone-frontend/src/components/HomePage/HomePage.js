import React, { useState, useEffect, useCallback } from "react";
import "./home-page.css";
import SearchBar from "../common/SearchBar/SearchBar";
import Card from "../common/Card/Card";
import DetailsPage from "../DetailsPage/DetailsPage";

const HomePage = () => {
  const [artistData, setArtistData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://localhost:7153/api/VibeZone/getAllData`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const data = result.$values || [];
        setArtistData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = useCallback((suggestion) => {
    setSearchResults([suggestion]);
    setIsSearching(true);
  }, []);

  const handleSearch = useCallback((results) => {
    setSearchResults(results);
    setIsSearching(true);
  }, []);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const dataToDisplay =
    isSearching && searchResults.length > 0 ? searchResults : artistData;

  return (
    <div className="home-page-wrapper">
      <SearchBar onSelect={handleSelect} onSearch={handleSearch} />

      <div className="cards-wrapper">
        {isSearching && searchResults.length === 0 ? (
          <p className="no-results">No results found</p>
        ) : (
          dataToDisplay.map((item) => (
            <Card key={`${item.$id}`} item={item} onOpenModal={handleOpenModal} />
          ))
        )}
      </div>

      {selectedItem && (
        <DetailsPage
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default HomePage;