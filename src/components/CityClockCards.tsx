import React, { useState, useEffect } from 'react';
import { CityNode } from '../types';
import { clockService } from '../services/clockService';

interface CityClockCardsProps {
  cities: CityNode[];
  selectedCity: CityNode;
  onSelectCity: (city: CityNode) => void;
  use24Hour?: boolean;
}

export const CityClockCards: React.FC<CityClockCardsProps> = ({
  cities,
  selectedCity,
  onSelectCity,
  use24Hour = true
}) => {
  const [, setTick] = useState(0);

  // Update card clocks every second
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#222632]">
      <div className="flex items-center gap-3 min-w-max">
        {cities.map((city) => {
          const isSelected = city.id === selectedCity.id;
          const { fullTimeStr, dateStr } = clockService.getTimeForZone(city.timezone, use24Hour);

          return (
            <div
              key={city.id}
              onClick={() => onSelectCity(city)}
              className={`w-[145px] bg-[#101216] border rounded-md p-3 cursor-pointer transition-all duration-200 select-none relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-[#3a4050] bg-[#14171d] shadow-[0_0_15px_rgba(0,0,0,0.5)]'
                  : 'border-[#1b1e26] hover:border-[#272c38] hover:bg-[#12141a]'
              }`}
            >
              {/* Active accent top glow border */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ef4444] shadow-[0_0_6px_#ef4444]" />
              )}

              <div>
                {/* Header: Status Dot + City Name */}
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#ef4444] shadow-[0_0_5px_#ef4444]' : 'bg-[#ef4444]/60'}`} />
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#dedad0] truncate">
                    {city.name}
                  </div>
                </div>

                {/* Date */}
                <div className="text-[9px] font-mono text-[#676f82] tracking-wider mb-2">
                  {dateStr}
                </div>
              </div>

              {/* Digital Time String */}
              <div className="text-[22px] font-mono font-semibold tracking-tight text-[#f5f0db] glow-digit my-1">
                {fullTimeStr}
              </div>

              {/* Footer Country & Region */}
              <div className="mt-2 pt-2 border-t border-[#1a1d26] text-[8px] font-mono text-[#585f70] tracking-widest uppercase flex items-center justify-between">
                <span className="truncate max-w-[70px]">{city.country}</span>
                <span className="truncate max-w-[55px] text-right text-[#798296]">{city.region}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
