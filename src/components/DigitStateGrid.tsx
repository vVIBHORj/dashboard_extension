import React from 'react';

interface DigitStateGridProps {
  label: string;
  value: number;
}

export const DigitStateGrid: React.FC<DigitStateGridProps> = ({ label, value }) => {
  // Determine active count for 3 rows x 4 cols (12 total cells)
  let activeCount = 0;
  if (label === 'HOURS') {
    activeCount = Math.min(12, Math.round((value / 24) * 12));
  } else {
    activeCount = Math.min(12, Math.round((value / 60) * 12));
  }

  return (
    <div className="w-[125px] h-[98px] bg-[#0B0C0C] border border-[rgba(255,255,255,0.13)] rounded-[10px] p-2.5 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
      <div className="grid grid-cols-4 grid-rows-3 gap-2 w-full h-full">
        {Array.from({ length: 12 }).map((_, idx) => {
          const isActive = idx < activeCount;
          return (
            <div
              key={idx}
              className={`rounded-[3px] transition-all duration-300 ${
                isActive
                  ? 'bg-[#F0EBDD] border border-transparent shadow-[0_0_8px_rgba(240,235,221,0.25)]'
                  : 'bg-[#111313] border border-[rgba(255,255,255,0.08)]'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
