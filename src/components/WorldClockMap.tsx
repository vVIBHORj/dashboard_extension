import React, { useState, useMemo } from 'react';
import { CityNode } from '../types';
import { WORLD_MAP_DOTS } from './mapDotsData';
import { clockService } from '../services/clockService';

interface WorldClockMapProps {
  cities: CityNode[];
  selectedCity: CityNode;
  onSelectCity: (city: CityNode) => void;
  use24Hour?: boolean;
}

export const WorldClockMap: React.FC<WorldClockMapProps> = ({
  cities,
  selectedCity,
  onSelectCity,
  use24Hour = true
}) => {
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null);

  // Memoize static map dots with seeded deterministic opacity variation
  const renderedMapDots = useMemo(() => {
    return WORLD_MAP_DOTS.map(([cx, cy], idx) => {
      // Seeded opacity variation between 0.40 and 0.90 for authentic dot-matrix feel
      const seed = (cx * 17 + cy * 31 + idx * 13) % 100;
      const opacity = 0.45 + (seed / 100) * 0.45;

      return (
        <circle
          key={idx}
          cx={cx}
          cy={cy}
          r={1.4}
          fill="#A8A8A2"
          opacity={opacity.toFixed(2)}
        />
      );
    });
  }, []);

  return (
    <div className="relative w-full aspect-[727/382] bg-gradient-to-b from-[#151616] to-[#101111] border border-[rgba(255,255,255,0.10)] rounded-md p-3 overflow-hidden flex items-center justify-center select-none shadow-2xl">
      {/* Subtle Inner Panel Layer Edge */}
      <div className="absolute inset-0 pointer-events-none border border-[rgba(255,255,255,0.015)] rounded-md" />

      {/* Top Left Header: • WORLD CLOCK */}
      <div className="absolute top-3.5 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#A7635C] shadow-[0_0_4px_rgba(167,99,92,0.4)]" />
        <span className="text-[11px] font-mono font-semibold tracking-[2px] text-[#C8C7BE] uppercase">
          WORLD CLOCK
        </span>
      </div>

      {/* Vector SVG Dotted World Map */}
      <svg
        viewBox="0 0 727 382"
        className="w-full h-full object-contain pointer-events-none select-none mt-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>{renderedMapDots}</g>
      </svg>

      {/* Interactive Glowing City Nodes Layer */}
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
                tabIndex={0}
                role="button"
                aria-label={`${city.name} world clock node`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectCity(city);
                  }
                }}
              >
                {/* Outer radial glow aura */}
                <circle
                  cx={city.mapX}
                  cy={city.mapY}
                  r={isSelected ? 16 : isHovered ? 12 : 8}
                  className={`transition-all duration-300 fill-current ${
                    isSelected
                      ? 'text-[rgba(240,236,217,0.35)] animate-pulse'
                      : isHovered
                      ? 'text-[rgba(240,236,217,0.25)]'
                      : 'text-[rgba(240,236,217,0.15)]'
                  }`}
                />

                {/* Secondary halo ring */}
                <circle
                  cx={city.mapX}
                  cy={city.mapY}
                  r={isSelected ? 7 : isHovered ? 5.5 : 4}
                  className={`transition-all duration-200 fill-current ${
                    isSelected ? 'text-[rgba(240,236,217,0.75)]' : 'text-[rgba(229,223,197,0.45)]'
                  }`}
                />

                {/* Central glowing core point */}
                <circle
                  cx={city.mapX}
                  cy={city.mapY}
                  r={isSelected ? 3.5 : 2.5}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? 'fill-[#ffffff] drop-shadow-[0_0_10px_rgba(255,255,255,1)]'
                      : 'fill-[#F0ECD9] drop-shadow-[0_0_5px_rgba(240,236,217,0.9)]'
                  }`}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover / Selection Industrial Tooltip */}
        {hoveredCity && (
          <div
            className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 bg-[#0d0e10] border border-[rgba(255,255,255,0.15)] text-[#e5e0d3] px-3 py-1.5 rounded shadow-2xl font-mono text-[10px] tracking-wider uppercase flex flex-col gap-0.5 whitespace-nowrap"
            style={{
              left: `${(hoveredCity.mapX / 727) * 100}%`,
              top: `${(hoveredCity.mapY / 382) * 100}%`
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A7635C]" />
              <span className="font-bold text-[#F0ECD9]">{hoveredCity.name}</span>
              <span className="text-[#6c7485]">[{hoveredCity.country}]</span>
            </div>
            <div className="text-[9px] text-[#22c55e] font-semibold pl-3">
              {clockService.getTimeForZone(hoveredCity.timezone, use24Hour).fullTimeStr} · {hoveredCity.timezone}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
