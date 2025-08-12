import type { Location } from "../types/Weather";

const fetchCitySuggestions = async (query: string) => {
    
  if (!query || query.length < 2) return [];

  //if there is no query or query is less than 2 characters then no suggestion will be fetched

  try {
    const apiKey = "806e71ca2ec092cc42be12e4db5359d9";
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) { //if for any reason the api is not successful
      throw new Error(`Error fetching City suggestions: ${res.status}`);
    }

    const data = await res.json();
    console.log("City fetched data is ", data);

    // map over data array and extract only two properties name and country
    return data.map((city: Location) => ({
      name: city.name,
      country: city.country
    }));
  } catch (err) {
    //if there's an error throw error 
    console.error("fetchCitySuggestions error:", err);
    return [];
  }
};

export default fetchCitySuggestions;
