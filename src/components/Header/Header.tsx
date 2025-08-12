import { useState, useEffect } from "react";
import styled from "./Header.module.css";
import type { Location } from "../../types/Weather";
import fetchCitySuggestions from "../../api/LocationSugesstion";

type Props = {
  currentLocationData: Location | null;
  onCitySearch: (city: string) => void;
  errorMsg?: string | null;
};

const Header = ({ currentLocationData, onCitySearch, errorMsg }: Props) => {

  // State to hold input text typed by user
  const [inputText, setInputText] = useState("");

  // State to hold fetched city suggestions,
  // array of objects with name and country properties
  const [suggestions, setSuggestions] = useState<{ name: string; country: string }[]>([]);

  // Effect to fetch suggestions with a delay of 300ms when inputText changes
  useEffect(() => {
    if (inputText.length < 2) {
      setSuggestions([]);  // Clear suggestions if input is too short
      return;
    }

    const timeoutId = setTimeout(async () => {
      const results = await fetchCitySuggestions(inputText);  // Fetch suggestions from API
      setSuggestions(results);
    }, 300); // Delay to avoid too many API calls while typing

    return () => clearTimeout(timeoutId); // Cleanup timeout on inputText change
  }, [inputText]);

  // Handler for form submission (search button)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCitySearch(inputText);    // Call parent search function with current input
    setSuggestions([]);         // Clear suggestions after search
  };

  // Handler for clicking a suggestion
  const handleSuggestionClick = (city: string) => {
    setInputText(city);         // Set input to clicked suggestion
    onCitySearch(city);         // Trigger search for clicked city
    setSuggestions([]);         // Clear suggestions after selection
  };

  return (
    /* Header container with current location info and search */
    <header className={styled.mainHeader}>
      {/* Show current location if available */}
      {currentLocationData && (
        <div className={styled.locationContainer}>
          <div className={styled.location}>
            {currentLocationData.name}, {currentLocationData.country}
          </div>
          <div className={styled.locationTime}>{currentLocationData.localtime}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styled.buttons}>
          {/* Input and suggestions container */}
          <div className={styled.inputWrapper}>
            <input
              type="text"
              className={styled.cityInput}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Search City"
            />

            {/* Show error message inline if exists */}
            {errorMsg && <div className={styled.errorMsg}>{errorMsg}</div>}

            {/* Show suggestion list if available */}
            {suggestions.length > 0 && (
              <div className={styled.suggestionBox}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    // On clicking a suggestion, trigger handleSuggestionClick
                    onClick={() => handleSuggestionClick(`${suggestion.name}, ${suggestion.country}`)}
                    className={styled.suggestionItem}
                  >
                    {suggestion.name}, {suggestion.country} {/* Display city and country */}
                  </div>
                ))}
              </div>
            )}
          </div>


          <button className={styled.searchButton} type="submit">Search</button>
        </div>
      </form>
    </header>
  );
};

export default Header;
