import type { ForecastDay } from "../../types/Weather";
import styled from './ForecastWeather.module.css'
type Props = {  
  dayForecast: ForecastDay;
};


const ForecastDayData= ({dayForecast}:Props) =>{ //by destructuring selecting only dayForecast from Props and creating one row for the day 1
    return(
        <>
        {/* how the forecast data should should look*/}
        
        <div className={styled.forecastWeatherRow}>
          
          <div>
             <div className={styled.date}>{dayForecast.date}</div>
              <div className={styled.text}>{dayForecast.day.condition.text}</div>
              </div>
              <div className={styled.conditionicon}>
  <img
    src={dayForecast.day.condition.icon}
    alt={dayForecast.day.condition.text}
  />
</div>

        <div>
          <div className={styled.maxtemp}>{dayForecast.day.maxtemp_c}°C</div>
      <div className={styled.maxlabel}>High</div>
      </div>
      <div>
      <div className={styled.mintemp}>{dayForecast.day.mintemp_c}°C</div>
      <div className={styled.minlabel}>Low</div>
      </div>
      <div>
      <div className={styled.feels}>{dayForecast.day.daily_chance_of_rain}%</div>
      <div className={styled.feelsL}>Rain</div>
      </div>
        </div>
        </>
    )
};
export default ForecastDayData;