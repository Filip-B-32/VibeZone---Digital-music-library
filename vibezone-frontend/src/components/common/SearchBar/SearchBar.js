import React, { useState, useEffect } from "react";
import "./search-bar.css";

const SearchBar = ({ onSelect, onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length > 1) {
        const url = `https://localhost:7153/api/VibeZone/search?query=${query.trim()}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          const data = result.$values || [];
          if (data.length === 0) {
            setSearchError("No results found");
          } else {
            setSearchError("");
          }
          setSuggestions(data);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
          setSearchError("Error fetching suggestions");
        }
      } else {
        setSuggestions([]);
        setSearchError("");
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const url = `https://localhost:7153/api/VibeZone/search?query=${query.trim()}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const data = result.$values || [];
      if (data.length === 0) {
        setSearchError("No results found");
      } else {
        setSearchError("");
      }
      if (query.trim().length > 1) {
        setSuggestions(data);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
      onSearch(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setSearchError("Error fetching suggestions");
      onSearch([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery("");
    setSuggestions([]);
    setSearchError("");
    setShowSuggestions(false);
    onSelect(suggestion);
  };

  const getSuggestionType = (suggestion) => {
    if (suggestion.type) {
      return `(${suggestion.type})`;
    }
    return "";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".search-container") === null) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <input
        type="text"
        id="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for artist, album, or song..."
      />
      <a href="#" onClick={handleSearch}>
        <img
          className="search-icon"
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          alt="search icon"
        />
      </a>
      {!searchError && showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSelect(suggestion)}>
              {suggestion.name || suggestion.title}{" "}
              {getSuggestionType(suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
