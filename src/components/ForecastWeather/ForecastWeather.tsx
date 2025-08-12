import type { ForecastDay } from "../../types/Weather";
import ForecastDayData from "./ForecastDayData";
import styled from './ForecastWeather.module.css'

type Props = {  
  forecastWeatherData: ForecastDay[] | null;
};

const Forecast = ({ forecastWeatherData }: Props) => {
  if (!forecastWeatherData) return null; //if no forecast data then render nothing 

  return (
    <>
  
    <p className={styled.forecastheading}>Weather Forecast</p>
    <div className={styled.container}>   
      <div className={styled.forecastweather}>
        { 
            /*parent component receiving forcastWeatherData as prop and passing ForecastDayData prop to child component  */
          forecastWeatherData.map((row, index) => (
            <ForecastDayData key={index} dayForecast={row} />
          ))
        }
      </div>
    </div>
    </>
  );
};

export default Forecast;
