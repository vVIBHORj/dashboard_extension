import React from 'react';

interface DigitalDigitProps {
  char: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGrid?: boolean;
}

export const DigitalDigit: React.FC<DigitalDigitProps> = ({ char, size = 'lg', showGrid = false }) => {
  // Dot matrix grid representations for digits 0-9
  const digitDotMatrix: { [key: string]: boolean[][] } = {
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
  };

  const matrix = digitDotMatrix[char] || digitDotMatrix['0'];

  // Size configurations
  const sizeClasses = {
    sm: 'gap-0.5 p-1',
    md: 'gap-1 p-1.5',
    lg: 'gap-1.5 p-2',
    xl: 'gap-2 p-3'
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4.5 h-4.5'
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center bg-[#0a0b0d] rounded-sm border border-[#1b1e26] ${sizeClasses[size]}`}>
      <div className="grid grid-cols-3 gap-1">
        {matrix.map((row, rIdx) =>
          row.map((active, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`${dotSizes[size]} rounded-full transition-all duration-200 ${
                active
                  ? 'bg-[#f5f0db] shadow-[0_0_8px_rgba(245,240,219,0.7)]'
                  : 'bg-[#181a20] border border-[#222630]/60'
              }`}
            />
          ))
        )}
      </div>

      {showGrid && (
        <div className="mt-2.5 grid grid-cols-4 gap-1 w-full pt-2 border-t border-[#1e222b]">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-[1px] transition-all duration-300 ${
                idx < parseInt(char || '0', 10)
                  ? 'bg-[#f5f0db] shadow-[0_0_5px_rgba(245,240,219,0.5)]'
                  : 'bg-[#14161c] border border-[#1c202a]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
