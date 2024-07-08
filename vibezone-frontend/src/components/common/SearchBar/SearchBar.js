import React, { useState, useEffect } from "react";
import "./search-bar.css";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 1) {
        const url = `https://localhost:7153/api/VibeZone/search?query=${query}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          // Assuming the actual data is in result.$values
          const data = result.$values || [];
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSelect = (suggestion) => {
    setQuery(suggestion.name || suggestion.title);
    setSuggestions([]);
    console.log("Selected:", suggestion);
    onSelect(suggestion);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        id="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for artist, album, or song..."
      />
      <a href="#">
        <img
          className="search-icon"
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          alt="search icon"
        />
      </a>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSelect(suggestion)}>
              {suggestion.name || suggestion.title} ({suggestion.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
