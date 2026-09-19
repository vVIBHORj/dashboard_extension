import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { storageService } from './services/storageService';
import { clockService } from './services/clockService';
import { weatherService } from './services/weatherService';
import { CityNode, WeatherData } from './types';
import { DigitalDigit } from './components/DigitalDigit';
import { ExternalLink, Clock, Cloud, StickyNote } from 'lucide-react';
import './index.css';

const PopupApp: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityNode | null>(null);
  const [timeStr, setTimeStr] = useState('22:16');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    storageService.getSelectedCity().then((city) => {
      setSelectedCity(city);
      const { fullTimeStr } = clockService.getTimeForZone(city.timezone, true);
      setTimeStr(fullTimeStr);
      weatherService.fetchWeather(city.lat, city.lng, city.name).then(setWeather);
    });

    const interval = setInterval(() => {
      if (selectedCity) {
        const { fullTimeStr } = clockService.getTimeForZone(selectedCity.timezone, true);
        setTimeStr(fullTimeStr);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  const handleOpenDashboard = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: 'index.html' });
    } else {
      window.open('index.html', '_blank');
    }
  };

  return (
    <div className="w-full h-full bg-[#07080a] text-[#dedad0] p-4 flex flex-col justify-between font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1b1e26]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_5px_#ef4444]" />
          <span className="text-[10px] font-bold tracking-widest uppercase">CONTROL TERMINAL</span>
        </div>
        <span className="text-[9px] text-[#22c55e] font-semibold">ONLINE</span>
      </div>

      {/* Main City Time Display */}
      <div className="my-2 bg-[#101216] border border-[#1b1e26] rounded p-3 text-center">
        <div className="text-[10px] text-[#6e7687] tracking-wider uppercase mb-1">
          {selectedCity?.name || 'SINGAPORE'}
        </div>
        
        <div className="flex items-center justify-center gap-1 my-2">
          {timeStr.split(':').map((part, pIdx) => (
            <React.Fragment key={pIdx}>
              {pIdx > 0 && <span className="text-xl text-[#525a6b] animate-pulse">:</span>}
              <div className="flex gap-1">
                {part.split('').map((char, cIdx) => (
                  <DigitalDigit key={cIdx} char={char} size="sm" />
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Quick Weather Preview */}
      <div className="bg-[#101216] border border-[#1b1e26] rounded p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-[#8a92a5]" />
          <div>
            <div className="text-[9px] text-[#5b6273] uppercase">WEATHER</div>
            <div className="text-xs font-bold text-[#f5f0db]">
              {weather ? `${weather.temperature}°C` : '33°C'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-[#5b6273] uppercase">AIR QUALITY</div>
          <div className="text-xs font-bold text-[#22c55e]">
            {weather ? `${weather.psi} ${weather.psiStatus}` : '40 GOOD'}
          </div>
        </div>
      </div>

      {/* Open Dashboard Action Button */}
      <button
        onClick={handleOpenDashboard}
        className="w-full py-2.5 bg-[#14171e] hover:bg-[#1a1e28] border border-[#262a37] rounded text-xs font-bold tracking-widest text-[#f5f0db] flex items-center justify-center gap-2 transition-all active:scale-98"
      >
        <ExternalLink className="w-3.5 h-3.5 text-[#22c55e]" />
        <span>OPEN FULL DASHBOARD</span>
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('popup-root')!).render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);
