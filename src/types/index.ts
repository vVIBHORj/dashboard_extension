export interface CityNode {
  id: string;
  name: string;
  country: string;
  region: string;
  timezone: string; // IANA timezone string e.g. "Asia/Singapore"
  lat: number;
  lng: number;
  // Canvas/SVG position relative to 727x382 world map
  mapX: number;
  mapY: number;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  uvIndex: number;
  windSpeed: number;
  pressure: number;
  cloudCover: number;
  visibility: number;
  psi: number; // Air quality index / PSI equivalent
  psiStatus: string;
  weatherCode: number;
  forecast: DayForecast[];
  locationName: string;
  updatedAt: number;
}

export interface DayForecast {
  dayName: string;
  dateStr: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
}

export interface LapTime {
  id: number;
  lapDuration: number; // ms
  totalTime: number; // ms
}

export interface AppSettings {
  use24Hour: boolean;
  temperatureUnit: 'C' | 'F';
  soundEnabled: boolean;
  soundVolume: number; // 0 to 1
  defaultTab: 'WORLD CLOCK' | 'STOPWATCH' | 'TIMER';
  reducedMotion: boolean;
}
