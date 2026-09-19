import React from 'react';

interface DotMatrixNumberProps {
  val: string;
}

export const DotMatrixNumber: React.FC<DotMatrixNumberProps> = ({ val }) => {
  const digits = val.padStart(2, '0').split('');

  // 5 column x 7 row dot matrix representations for 0-9
  const digitPatterns: { [key: string]: boolean[][] } = {
    '0': [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
    ],
    '1': [
      [false, false, true, false, false],
      [false, true, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [0, 1, 1, 1, 0].map(Boolean),
    ],
    '2': [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
    ],
    '3': [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
    ],
    '4': [
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
    ],
    '5': [
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
    ],
    '6': [
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
    ],
    '7': [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, true, false],
      [false, false, true, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
    ],
    '8': [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
    ],
    '9': [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
    ]
  };

  const d1 = digitPatterns[digits[0]] || digitPatterns['0'];
  const d2 = digitPatterns[digits[1]] || digitPatterns['0'];

  return (
    <div className="flex items-center gap-2 select-none justify-center my-3">
      {/* First Digit */}
      <div className="grid grid-cols-5 gap-[3px]">
        {d1.map((row, rIdx) =>
          row.map((active, cIdx) => (
            <div
              key={`d1-${rIdx}-${cIdx}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                active
                  ? 'bg-[#F0EBDD] shadow-[0_0_6px_rgba(240,235,221,0.5)]'
                  : 'bg-[#353635]'
              }`}
            />
          ))
        )}
      </div>

      {/* Second Digit */}
      <div className="grid grid-cols-5 gap-[3px]">
        {d2.map((row, rIdx) =>
          row.map((active, cIdx) => (
            <div
              key={`d2-${rIdx}-${cIdx}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                active
                  ? 'bg-[#F0EBDD] shadow-[0_0_6px_rgba(240,235,221,0.5)]'
                  : 'bg-[#353635]'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};
