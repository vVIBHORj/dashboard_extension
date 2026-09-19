import React, { useEffect, useState } from 'react';
import { WeatherData } from '../types';
import { weatherService } from '../services/weatherService';
import { DotMatrixTemp } from './DotMatrixTemp';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  CloudFog,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Grid,
  Thermometer
} from 'lucide-react';

interface WeatherPanelProps {
  lat: number;
  lng: number;
  locationName: string;
}

export const WeatherPanel: React.FC<WeatherPanelProps> = ({ lat, lng, locationName }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    weatherService.fetchWeather(lat, lng, locationName).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  }, [lat, lng, locationName]);

  const renderWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-4 h-4 text-[#a7a7a0]" strokeWidth={1.5} />;
    if (code >= 1 && code <= 3) return <Cloud className="w-4 h-4 text-[#a7a7a0]" strokeWidth={1.5} />;
    if (code >= 45 && code <= 48) return <CloudFog className="w-4 h-4 text-[#a7a7a0]" strokeWidth={1.5} />;
    if (code >= 51 && code <= 55) return <CloudDrizzle className="w-4 h-4 text-[#a7a7a0]" strokeWidth={1.5} />;
    if (code >= 61 && code <= 67) return <CloudRain className="w-4 h-4 text-[#a7a7a0]" strokeWidth={1.5} />;
    if (code >= 71 && code <= 77) return <Snowflake className="w-4 h-4 text-[#a7a7a0]" strokeWidth={1.5} />;
    if (code >= 95) return <CloudLightning className="w-4 h-4 text-[#a7a7a0]" strokeWidth={1.5} />;
    return <Cloud className="w-4 h-4 text-[#a7a7a0]" strokeWidth={1.5} />;
  };

  if (loading || !weather) {
    return (
      <div className="w-full bg-[#181919] border border-[rgba(255,255,255,0.10)] rounded-md p-3 flex items-center justify-between font-mono text-[10px] text-[#70716d] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a8635a] animate-ping" />
          <span>WEATHER PREVIEW</span>
          <span className="text-[8px] text-[#555652]">{locationName.toUpperCase()}...</span>
        </div>
        <span>SYNCING...</span>
      </div>
    );
  }

  // Truncate location name visually (e.g. TANJONG PAGAR -> TANJO...)
  const truncatedLocation = locationName.length > 5 ? `${locationName.substring(0, 5).toUpperCase()}...` : locationName.toUpperCase();

  return (
    <div className="w-full bg-gradient-to-b from-[#1c1d1d] to-[#161717] border border-[rgba(255,255,255,0.10)] rounded-md px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-between gap-2 select-none">
      
      {/* 1. LEFT SECTION: Header + Digital Temperature */}
      <div className="flex flex-col justify-between h-full pr-4 border-r border-[rgba(255,255,255,0.10)] shrink-0 min-w-[170px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#a8635a] shadow-[0_0_4px_#a8635a]" />
          <span className="text-[10px] font-mono font-bold tracking-[1.5px] text-[#e6e4d8] uppercase">
            Weather Preview
          </span>
          <span className="text-[8px] font-mono text-[#70716d] tracking-wider uppercase ml-1">
            {truncatedLocation}
          </span>
        </div>

        {/* Digital Temperature Display */}
        <div className="my-1">
          <DotMatrixTemp temperature={weather.temperature} />
        </div>

        {/* Feels Like Label */}
        <div className="text-[8px] font-mono tracking-[1.5px] text-[rgba(235,235,225,0.45)] uppercase mt-1">
          FEELS LIKE {weather.feelsLike}°
        </div>
      </div>

      {/* 2. CENTER SECTION: Weather Metrics Strip */}
      <div className="flex-1 flex items-center justify-evenly px-2 gap-3">
        {/* Metric 1: PSI */}
        <div className="flex flex-col items-center justify-center text-center">
          <Grid className="w-4 h-4 text-[#a7a7a0] mb-1" strokeWidth={1.5} />
          <span className="text-[8px] font-mono text-[rgba(230,230,220,0.52)] tracking-[1.5px] uppercase mb-0.5">PSI</span>
          <span className="text-lg font-mono font-semibold text-[#dddccf] leading-none my-0.5">{weather.psi}</span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-1 h-1 rounded-full bg-[#7f967a]" />
            <span className="text-[7px] font-mono text-[#7f967a] tracking-wider uppercase">{weather.psiStatus}</span>
          </div>
        </div>

        {/* Metric 2: HUMIDITY */}
        <div className="flex flex-col items-center justify-center text-center">
          <Droplets className="w-4 h-4 text-[#a7a7a0] mb-1" strokeWidth={1.5} />
          <span className="text-[8px] font-mono text-[rgba(230,230,220,0.52)] tracking-[1.5px] uppercase mb-0.5">HUMIDITY</span>
          <span className="text-lg font-mono font-semibold text-[#dddccf] leading-none my-0.5">{weather.humidity}%</span>
        </div>

        {/* Metric 3: UV INDEX */}
        <div className="flex flex-col items-center justify-center text-center">
          <Sun className="w-4 h-4 text-[#a7a7a0] mb-1" strokeWidth={1.5} />
          <span className="text-[8px] font-mono text-[rgba(230,230,220,0.52)] tracking-[1.5px] uppercase mb-0.5">UV INDEX</span>
          <span className="text-lg font-mono font-semibold text-[#dddccf] leading-none my-0.5">{weather.uvIndex}</span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-1 h-1 rounded-full bg-[#7f967a]" />
            <span className="text-[7px] font-mono text-[#7f967a] tracking-wider uppercase">LOW</span>
          </div>
        </div>

        {/* Metric 4: WIND */}
        <div className="flex flex-col items-center justify-center text-center">
          <Wind className="w-4 h-4 text-[#a7a7a0] mb-1" strokeWidth={1.5} />
          <span className="text-[8px] font-mono text-[rgba(230,230,220,0.52)] tracking-[1.5px] uppercase mb-0.5">WIND</span>
          <span className="text-sm font-mono font-semibold text-[#dddccf] leading-none my-0.5">{weather.windSpeed} km/h</span>
        </div>

        {/* Metric 5: PRESSURE */}
        <div className="flex flex-col items-center justify-center text-center">
          <Gauge className="w-4 h-4 text-[#a7a7a0] mb-1" strokeWidth={1.5} />
          <span className="text-[8px] font-mono text-[rgba(230,230,220,0.52)] tracking-[1.5px] uppercase mb-0.5">PRESSURE</span>
          <span className="text-sm font-mono font-semibold text-[#dddccf] leading-none my-0.5">{weather.pressure}</span>
          <span className="text-[7px] font-mono text-[#70716d] tracking-wider uppercase">HPA</span>
        </div>

        {/* Metric 6: CLOUD COVER */}
        <div className="flex flex-col items-center justify-center text-center">
          <Cloud className="w-4 h-4 text-[#a7a7a0] mb-1" strokeWidth={1.5} />
          <span className="text-[8px] font-mono text-[rgba(230,230,220,0.52)] tracking-[1.5px] uppercase leading-tight mb-0.5">
            CLOUD<br />COVER
          </span>
          <span className="text-sm font-mono font-semibold text-[#dddccf] leading-none my-0.5">{weather.cloudCover}%</span>
        </div>

        {/* Metric 7: VISIBILITY */}
        <div className="flex flex-col items-center justify-center text-center">
          <Eye className="w-4 h-4 text-[#a7a7a0] mb-1" strokeWidth={1.5} />
          <span className="text-[8px] font-mono text-[rgba(230,230,220,0.52)] tracking-[1.5px] uppercase mb-0.5">VISIBILITY</span>
          <span className="text-sm font-mono font-semibold text-[#dddccf] leading-none my-0.5">{weather.visibility} km</span>
        </div>

        {/* Metric 8: FEELS LIKE */}
        <div className="flex flex-col items-center justify-center text-center">
          <Thermometer className="w-4 h-4 text-[#a7a7a0] mb-1" strokeWidth={1.5} />
          <span className="text-[8px] font-mono text-[rgba(230,230,220,0.52)] tracking-[1.5px] uppercase mb-0.5">FEELS LIKE</span>
          <span className="text-sm font-mono font-semibold text-[#dddccf] leading-none my-0.5">{weather.feelsLike}°</span>
        </div>
      </div>

      {/* 3. VERTICAL DIVIDER & RIGHT SECTION: 7-Day Forecast */}
      <div className="pl-4 border-l border-[rgba(255,255,255,0.10)] flex items-center gap-2 shrink-0">
        {weather.forecast.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center justify-between py-0.5 px-1.5 min-w-[34px]">
            <span className="text-[8px] font-mono text-[rgba(235,235,225,0.50)] tracking-[1.5px] uppercase mb-1">{day.dayName}</span>
            <div className="my-1">{renderWeatherIcon(day.weatherCode)}</div>
            <span className="text-xs font-mono font-semibold text-[#e6e4d8] mt-1">{day.tempMax}°</span>
            <span className="text-[8px] font-mono text-[rgba(235,235,225,0.40)]">{day.tempMin}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};
