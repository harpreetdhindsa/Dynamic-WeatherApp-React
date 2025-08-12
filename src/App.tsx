import { useState, useEffect } from "react";
import { fetchWeatherFromAPI } from "./api/WeatherApi";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Footer from "./components/Footer/Footer";
import ForecastWeather from "./components/ForecastWeather/ForecastWeather";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Map from "./components/Map/Map";
import Background from "./utils/Background";
import "./App.css";

import type { Weather, ForecastDay, Location } from "./types/Weather";

function App() {
 // useStates to manage weather,errors and loader 
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [forecastWeather, setForecastWeather] = useState<ForecastDay[]>([]);
  const [locationData, setLocationData] = useState<Location | null>(null);

  //useState to set default city to vancouver and also to store the updated city
  const [city, setCity] = useState("Vancouver");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  //funtion that accepts cityname variable and set the city to the city specified by user 
  const handleCitySearch = (cityName: string) => {
    setCity(cityName);
    setErrorMsg(null); //initially error message is null
  };


  //useEffect to call api to fetch data
  useEffect(() => {
    async function getWeather() {
    
      setLoading(true);
      setErrorMsg(null);
      const minTimer = new Promise((resolve) => setTimeout(resolve, 500));

      try {
        //calling fetchWeatherFromAPI function from api/weatherAPI.tsx
        const weatherData = await fetchWeatherFromAPI(city);

        //if no data is there for the city
        if (
          !weatherData ||
          !weatherData.currentWeatherData ||
          !weatherData.currentLocationData
        ) {
          //setting the error message
          setErrorMsg("Sorry, city not found.Make sure city is correct");
         
        } else {
          //if no error while fetching the city then set weather details and also error message to null
          setCurrentWeather(weatherData.currentWeatherData);
          setLocationData(weatherData.currentLocationData);
          setForecastWeather(weatherData.forecastArray);
          setErrorMsg(null);
        }
      } catch (error) {
        //if some othe error such as internet issue then catch and display below message 
        setErrorMsg("Failed to fetch weather data.");
      
      }

      await minTimer; //wait for set time 
      setLoading(false);//set the loader off
    }

    getWeather();
  }, [city]); //api call is dependent upon city

return (
  <div className="mainContainer">
    <div
      style={{
        /* Dynamic background based on weather condition */
        background: Background(currentWeather?.condition?.text || ""),
        minHeight: "100vh",
        minWidth: "100vw",
        transition: "background 0.5s ease",
      }}
    >
      {loading ? (
        <Loader isLoading={true} />
      ) : 
      // If error AND no weather data(no network) show ONLY error message 
      errorMsg && !currentWeather ? (
        <div
          style={{
            color: "red",
            fontSize: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          {errorMsg}
        </div>
      ) : (
        <>
          {/* if data exists but city is mistyped or api error then show inline message on header with old data of serached city */}
          <Header
            onCitySearch={handleCitySearch}
            currentLocationData={locationData}
            errorMsg={errorMsg}
          />
           <main>
              {currentWeather && locationData && forecastWeather.length > 0 && (
                <>
                  <CurrentWeather currentWeatherData={currentWeather} />
                  <ForecastWeather forecastWeatherData={forecastWeather} />
                  <Map
                    locationData={locationData}
                    currentWeather={currentWeather}
                  />
                </>
              )}
            </main>
          <Footer />
        </>
      )}
    </div>
  </div>
);

}

export default App;
