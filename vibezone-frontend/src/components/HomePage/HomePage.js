import React, { useState, useEffect } from "react";
import "./home-page.css";
import SearchBar from "../common/SearchBar/SearchBar";

const HomePage = () => {
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://localhost:7153/api/VibeZone`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtistData(data);
        console.log(data); // Use data instead of artistData to see the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (suggestion) => {
    console.log("Selected:", suggestion);
    // You can now fetch additional data based on the selected suggestion or navigate to a different page
  };

  return (
    <div className="home-page-wrapper">
      <SearchBar onSelect={handleSelect} />
      {/* Render artist data or other content */}
    </div>
  );
};

export default HomePage;
