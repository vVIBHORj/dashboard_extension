import React, { useState } from 'react';
import { CityNode } from '../types';
import { cityDatabase } from '../services/cityDatabase';

interface CitySearchProps {
  onAddCity: (city: CityNode) => void;
  onRemoveCity: () => void;
  selectedCity: CityNode;
  canRemove: boolean;
}

export const CitySearch: React.FC<CitySearchProps> = ({
  onAddCity,
  onRemoveCity,
  selectedCity,
  canRemove
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = query ? cityDatabase.searchCities(query) : [];

  const handleSelect = (city: CityNode) => {
    onAddCity(city);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3 w-full my-3 relative">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search city node"
          className="w-full bg-[#0d0e12] border border-[#1b1e26] rounded px-3 py-2 text-xs font-mono text-[#dedad0] placeholder-[#4e5464] focus:outline-none focus:border-[#353a47] transition-colors"
        />

        {/* Autocomplete Dropdown */}
        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#101216] border border-[#272b38] rounded shadow-2xl z-30 max-h-48 overflow-y-auto">
            {results.map((city) => (
              <div
                key={city.id}
                onClick={() => handleSelect(city)}
                className="px-3 py-2 hover:bg-[#181b22] cursor-pointer text-xs font-mono flex items-center justify-between border-b border-[#181b24] last:border-none"
              >
                <div>
                  <span className="text-[#f5f0db] font-semibold">{city.name}</span>
                  <span className="text-[#646b7c] ml-2">({city.country})</span>
                </div>
                <span className="text-[10px] text-[#4f5667]">{city.timezone}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REMOVE BUTTON */}
      <button
        onClick={onRemoveCity}
        disabled={!canRemove}
        className={`px-4 py-2 border rounded text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-200 ${
          canRemove
            ? 'border-[#2a2e39] bg-[#12141a] text-[#868d9e] hover:text-[#ef4444] hover:border-[#ef4444]/40 hover:bg-[#181519] active:scale-95'
            : 'border-[#171920] bg-[#0c0d10] text-[#3c4150] cursor-not-allowed'
        }`}
        title={`Remove ${selectedCity.name} card`}
      >
        REMOVE
      </button>
    </div>
  );
};
