import React, { useState } from 'react';
import { CityNode } from '../types';

interface WorldMapProps {
  cities: CityNode[];
  selectedCity: CityNode;
  onSelectCity: (city: CityNode) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ cities, selectedCity, onSelectCity }) => {
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null);

  return (
    <div className="relative w-full aspect-[727/382] bg-[#090a0d] border border-[#1b1e26] rounded-md p-2 overflow-hidden flex items-center justify-center">
      {/* Background World Map graphic referencing world-map.png */}
      <img
        src="world-map.png"
        alt="World Map"
        className="w-full h-full object-contain pointer-events-none select-none opacity-85 brightness-90 contrast-110"
      />

      {/* Interactive Glowing City Nodes overlaid on top */}
      <div className="absolute inset-0 pointer-events-auto">
        <svg viewBox="0 0 727 382" className="w-full h-full">
          {cities.map((city) => {
            const isSelected = city.id === selectedCity.id;
            const isHovered = hoveredCity?.id === city.id;

            return (
              <g
                key={city.id}
                className="cursor-pointer group"
                onClick={() => onSelectCity(city)}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                {/* Outer pulsing radial glow aura */}
                <circle
                  cx={city.mapX}
                  cy={city.mapY}
                  r={isSelected ? 14 : isHovered ? 11 : 7}
                  className={`transition-all duration-300 fill-current ${
                    isSelected
                      ? 'text-[#f5f0db]/35 animate-pulse'
                      : isHovered
                      ? 'text-[#f5f0db]/25'
                      : 'text-[#f5f0db]/15'
                  }`}
                />
                
                {/* Secondary ring */}
                <circle
                  cx={city.mapX}
                  cy={city.mapY}
                  r={isSelected ? 6 : isHovered ? 5 : 3.5}
                  className={`transition-all duration-200 fill-current ${
                    isSelected ? 'text-[#f5f0db]/70' : 'text-[#e5dfc5]/40'
                  }`}
                />

                {/* Central glowing core point */}
                <circle
                  cx={city.mapX}
                  cy={city.mapY}
                  r={isSelected ? 3 : 2}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? 'fill-[#ffffff] drop-shadow-[0_0_10px_rgba(255,255,255,1)]'
                      : 'fill-[#f5f0db] drop-shadow-[0_0_5px_rgba(245,240,219,0.9)]'
                  }`}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover / Active Tooltip */}
        {hoveredCity && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 bg-[#0e1014] border border-[#2a2e3a] text-[#e5e0d3] px-2.5 py-1 rounded shadow-xl font-mono text-[10px] tracking-wider uppercase flex items-center gap-1.5 whitespace-nowrap"
            style={{
              left: `${(hoveredCity.mapX / 727) * 100}%`,
              top: `${(hoveredCity.mapY / 382) * 100}%`
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
            <span className="font-bold">{hoveredCity.name}</span>
            <span className="text-[#6c7485]">[{hoveredCity.country}]</span>
          </div>
        )}
      </div>
    </div>
  );
};
