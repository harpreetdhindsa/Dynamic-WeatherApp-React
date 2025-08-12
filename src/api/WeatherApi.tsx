import type { ForecastListItem } from "../types/Weather";

export async function fetchWeatherFromAPI(city: string) {
  const apiKey = "806e71ca2ec092cc42be12e4db5359d9";
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    //this case happens when user types city name wrong or city doesn't exist at all and in such case api retunrs null and we want to handle this case in parent components with more user friendly message
    if (currentRes.status === 404 || forecastRes.status === 404) {
      return null;
    }
// for many other types errors
    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("Weather API request failed");
    }

    const currentData = await currentRes.json();
    const forecastDataRaw = (await forecastRes.json()) as {
      list: ForecastListItem[];
    };
//storing the temp from currentWeather into different variables
    const currentWeatherData = {
      temp_c: currentData.main.temp,
      feelslike_c: currentData.main.feels_like,
      grnd_level: currentData.main.grnd_level,
      humidity: currentData.main.humidity,
      gust_kph: ((currentData.wind.gust || currentData.wind.speed) * 3.6).toFixed(1),
      pressure: currentData.main.pressure,
      seaLevel: currentData.main.sea_level,
      condition: {
        text: currentData.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
      },
    };
//same storing values in differnt variables
    const currentLocationData = {
      name: currentData.name,
      country: currentData.sys.country,
      lat: currentData.coord.lat,
      lon: currentData.coord.lon,
      localtime: new Date(currentData.dt * 1000).toLocaleString(),
    };

    // Group forecast by date
    const forecastMap: { [date: string]: ForecastListItem[] } = {};
    forecastDataRaw.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!forecastMap[date]) {
        forecastMap[date] = [];
      }
      forecastMap[date].push(item);
    });

    const forecastArray = Object.entries(forecastMap).map(([date, items]) => {
      const temps = items.map((i) => i.main.temp);
      const rain = items.map((i) => i.pop);
      const condition =
        items.find((i) => i.dt_txt.includes("12:00:00")) || items[0];

      return {
        //this is what we need from forecast array
        date: date,
        day: {
          maxtemp_c: Math.max(...temps),
          mintemp_c: Math.min(...temps),
          daily_chance_of_rain: Math.max(...rain) * 100 || 0,
          condition: {
            text: condition.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${condition.weather[0].icon}@2x.png`,
          },
        },
      };
    });

    return {
      currentWeatherData,
      currentLocationData,
      forecastArray,
    };
  } catch (error) {
    throw error; //whatever error was caguht throw it 
  }
}
