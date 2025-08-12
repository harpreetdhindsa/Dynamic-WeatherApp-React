//types 

export interface Weather {
  temp_c: number;
  feelslike_c: number;
  grnd_level: number;
  humidity: number;
  gust_kph: string;
  pressure: number;
  seaLevel: number;
  condition: {
    text: string;
    icon: string;
  };
}

export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export interface ForecastListItem {
  dt_txt: string;
  main: { temp: number; };
  pop: number;
  weather: { description: string; icon: string }[];
  
}








 