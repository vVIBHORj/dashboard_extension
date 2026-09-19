import { WeatherData, DayForecast } from '../types';

const DAYS_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const cache: { [key: string]: { data: WeatherData; timestamp: number } } = {};
const CACHE_DURATION = 15 * 60 * 1000; // 15 mins

export const weatherService = {
  async fetchWeather(lat: number, lng: number, locationName: string): Promise<WeatherData> {
    const cacheKey = `${lat.toFixed(2)},${lng.toFixed(2)}`;
    const now = Date.now();

    if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
      return { ...cache[cacheKey].data, locationName };
    }

    try {
      // 1. Fetch current weather & 7-day forecast from Open-Meteo
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,cloud_cover&hourly=uv_index,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const res = await fetch(weatherUrl);
      if (!res.ok) throw new Error('Weather API error');
      const data = await res.json();

      // 2. Fetch Air Quality (PSI / European AQI) from Open-Meteo Air Quality API
      let psi = 40;
      let psiStatus = 'GOOD';
      try {
        const aqUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=pm10,pm2_5,european_aqi`;
        const aqRes = await fetch(aqUrl);
        if (aqRes.ok) {
          const aqData = await aqRes.json();
          if (aqData.current) {
            const eaqi = aqData.current.european_aqi ?? aqData.current.pm10 ?? 40;
            psi = Math.round(eaqi);
            if (psi <= 50) psiStatus = 'GOOD';
            else if (psi <= 100) psiStatus = 'MODERATE';
            else psiStatus = 'UNHEALTHY';
          }
        }
      } catch {
        // Fallback PSI
      }

      const current = data.current || {};
      const hourly = data.hourly || {};
      const daily = data.daily || {};

      const temperature = Math.round(current.temperature_2m ?? 33);
      const feelsLike = Math.round(current.apparent_temperature ?? 32);
      const humidity = Math.round(current.relative_humidity_2m ?? 82);
      const windSpeed = Math.round(current.wind_speed_10m ?? 3);
      const pressure = Math.round(current.surface_pressure ?? 1009);
      const cloudCover = Math.round(current.cloud_cover ?? 72);
      
      const uvIndex = hourly.uv_index ? Math.round(hourly.uv_index[0] ?? 6) : 6;
      const visibilityKm = hourly.visibility ? ((hourly.visibility[0] ?? 9600) / 1000).toFixed(1) : '9.6';

      // 7-day forecast
      const forecast: DayForecast[] = [];
      if (daily.time && daily.time.length) {
        for (let i = 0; i < Math.min(7, daily.time.length); i++) {
          const d = new Date(daily.time[i]);
          const dayName = DAYS_SHORT[d.getDay()];
          forecast.push({
            dayName,
            dateStr: daily.time[i],
            weatherCode: daily.weather_code ? daily.weather_code[i] : 0,
            tempMax: Math.round(daily.temperature_2m_max[i]),
            tempMin: Math.round(daily.temperature_2m_min[i])
          });
        }
      }

      const weatherResult: WeatherData = {
        temperature,
        feelsLike,
        humidity,
        uvIndex,
        windSpeed,
        pressure,
        cloudCover,
        visibility: parseFloat(visibilityKm),
        psi,
        psiStatus,
        weatherCode: current.weather_code ?? 0,
        forecast,
        locationName,
        updatedAt: Date.now()
      };

      cache[cacheKey] = { data: weatherResult, timestamp: now };
      return weatherResult;
    } catch (err) {
      console.warn('Weather fetch failed, returning fallback data:', err);
      return {
        temperature: 33,
        feelsLike: 32,
        humidity: 82,
        uvIndex: 6,
        windSpeed: 3,
        pressure: 1009,
        cloudCover: 72,
        visibility: 9.6,
        psi: 40,
        psiStatus: 'GOOD',
        weatherCode: 3,
        forecast: [
          { dayName: 'WED', dateStr: '', weatherCode: 3, tempMax: 33, tempMin: 24 },
          { dayName: 'THU', dateStr: '', weatherCode: 3, tempMax: 34, tempMin: 25 },
          { dayName: 'FRI', dateStr: '', weatherCode: 3, tempMax: 34, tempMin: 25 },
          { dayName: 'SAT', dateStr: '', weatherCode: 3, tempMax: 34, tempMin: 24 },
          { dayName: 'SUN', dateStr: '', weatherCode: 0, tempMax: 33, tempMin: 24 },
          { dayName: 'MON', dateStr: '', weatherCode: 1, tempMax: 34, tempMin: 25 },
          { dayName: 'TUE', dateStr: '', weatherCode: 2, tempMax: 33, tempMin: 24 }
        ],
        locationName,
        updatedAt: Date.now()
      };
    }
  }
};
