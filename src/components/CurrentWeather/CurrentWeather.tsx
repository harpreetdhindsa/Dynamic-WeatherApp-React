import type { Weather } from "../../types/Weather";
import styled from "./CurrentWeather.module.css";

type Props = {
  currentWeatherData: Weather | null;
};

const CurrentWeather = ({ currentWeatherData }: Props) => {
  if (!currentWeatherData) return null;

  //columns array
  const columns = [
    [
      { key: "feelslike", value: currentWeatherData.feelslike_c, unit: "°C", label: "FeelsLike" },
      { key: "windgust", value: currentWeatherData.gust_kph, unit: "km/h", label: "WindGusts" },
    ],
    [
      { key: "grndLevel", value: currentWeatherData.grnd_level, unit: "hPa", label: "GrndLevel" },
      { key: "humidity", value: currentWeatherData.humidity, unit: "%", label: "Humidity" },
    ],
    [
      { key: "pressure", value: currentWeatherData.pressure, unit: "hPa", label: "Pressure" },
      { key: "seaLevel", value: currentWeatherData.seaLevel, unit: "hPa", label: "SeaLevel" },
    ],
  ];

  return (
    <div className={styled.currentweather}>
      {/*left side of weather app current weather,location,temp and condition */}
      <div className={styled.icontemp}>
        <div>
          <img
            className={styled.icon}
            src={currentWeatherData.condition.icon}
            alt={currentWeatherData.condition.text}
          />
        </div>
        <div>
          <div className={styled.temp}>{currentWeatherData.temp_c}°C</div>
          <div className={styled.condition}>{currentWeatherData.condition.text}</div>
        </div>
      </div>
{/*right side is as below */}
      <div className={styled.wind}>
        {columns.map((col, colIndex) => (
          <div key={colIndex} className={styled.gridcolumn}>
            {/*nested map that repeat within the col items */}
            {col.map((item, itemIndex) => (
              <div key={itemIndex}>
                <div className={styled[item.key]}>
                  {/*takes care if any field doesn't have value then display "-" */}
                  {item.value != null ? item.value : "-"}
                  {item.unit}
                </div>
                {/*creating classNames on the go by adding Label to key value */}
                <div className={styled[item.key + "Label"]}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
