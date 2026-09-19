import React from 'react';

interface DotMatrixTempProps {
  temperature: number;
}

export const DotMatrixTemp: React.FC<DotMatrixTempProps> = ({ temperature }) => {
  const tempStr = Math.abs(temperature).toString().padStart(2, '0');

  // Dot matrix grid definitions for digits 0-9 and degree symbol
  const patterns: { [key: string]: boolean[][] } = {
    '0': [
      [true, true, true],
      [true, false, true],
      [true, false, true],
      [true, false, true],
      [true, true, true],
    ],
    '1': [
      [false, true, false],
      [true, true, false],
      [false, true, false],
      [false, true, false],
      [true, true, true],
    ],
    '2': [
      [true, true, true],
      [false, false, true],
      [true, true, true],
      [true, false, false],
      [true, true, true],
    ],
    '3': [
      [true, true, true],
      [false, false, true],
      [true, true, true],
      [false, false, true],
      [true, true, true],
    ],
    '4': [
      [true, false, true],
      [true, false, true],
      [true, true, true],
      [false, false, true],
      [false, false, true],
    ],
    '5': [
      [true, true, true],
      [true, false, false],
      [true, true, true],
      [false, false, true],
      [true, true, true],
    ],
    '6': [
      [true, true, true],
      [true, false, false],
      [true, true, true],
      [true, false, true],
      [true, true, true],
    ],
    '7': [
      [true, true, true],
      [false, false, true],
      [false, true, false],
      [true, false, false],
      [true, false, false],
    ],
    '8': [
      [true, true, true],
      [true, false, true],
      [true, true, true],
      [true, false, true],
      [true, true, true],
    ],
    '9': [
      [true, true, true],
      [true, false, true],
      [true, true, true],
      [false, false, true],
      [true, true, true],
    ],
    'deg': [
      [true, true, false],
      [true, true, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]
  };

  const d1 = patterns[tempStr[0]] || patterns['0'];
  const d2 = patterns[tempStr[1]] || patterns['0'];
  const deg = patterns['deg'];

  return (
    <div className="flex items-center gap-2 select-none">
      {/* Digit 1 */}
      <div className="grid grid-cols-3 gap-1">
        {d1.map((row, r) =>
          row.map((active, c) => (
            <div
              key={`d1-${r}-${c}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                active
                  ? 'bg-[#eeeebf] shadow-[0_0_8px_rgba(238,238,191,0.6)]'
                  : 'bg-[#202224] border border-[#2a2d30]/40'
              }`}
            />
          ))
        )}
      </div>

      {/* Digit 2 */}
      <div className="grid grid-cols-3 gap-1">
        {d2.map((row, r) =>
          row.map((active, c) => (
            <div
              key={`d2-${r}-${c}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                active
                  ? 'bg-[#eeeebf] shadow-[0_0_8px_rgba(238,238,191,0.6)]'
                  : 'bg-[#202224] border border-[#2a2d30]/40'
              }`}
            />
          ))
        )}
      </div>

      {/* Degree Symbol */}
      <div className="grid grid-cols-2 gap-1 self-start mt-0.5">
        {deg.map((row, r) =>
          row.slice(0, 2).map((active, c) => (
            <div
              key={`deg-${r}-${c}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                active
                  ? 'bg-[#eeeebf] shadow-[0_0_6px_rgba(238,238,191,0.6)]'
                  : 'bg-transparent'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};
