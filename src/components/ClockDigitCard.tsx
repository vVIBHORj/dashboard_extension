import React from 'react';
import { DotMatrixNumber } from './DotMatrixNumber';
import { DigitStateGrid } from './DigitStateGrid';

interface ClockDigitCardProps {
  label: 'HOURS' | 'MINUTES' | 'SECONDS';
  value: string;
}

export const ClockDigitCard: React.FC<ClockDigitCardProps> = ({ label, value }) => {
  const numericVal = parseInt(value, 10) || 0;

  return (
    <div className="flex-1 min-w-0 bg-gradient-to-b from-[#242525] via-[#1E1F1F] via-[#161717] to-[#101111] border border-[rgba(210,210,202,0.19)] rounded-[13px] p-4 flex flex-col items-center justify-between shadow-[0_5px_18px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.025),inset_0_-1px_0_rgba(0,0,0,0.50)] relative overflow-hidden group hover:border-[rgba(210,210,202,0.30)] transition-all select-none">
      {/* Top Left & Top Right Decorative Recessed Screws/Sensors */}
      <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full border border-[rgba(255,255,255,0.06)] bg-[#080909] shadow-[inset_0_0_2px_rgba(0,0,0,0.8)]" />
      <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-[rgba(255,255,255,0.06)] bg-[#080909] shadow-[inset_0_0_2px_rgba(0,0,0,0.8)]" />

      {/* Uppercase Header Label */}
      <div className="text-[13px] font-sans font-semibold tracking-[2px] text-[rgba(220,220,212,0.72)] uppercase mt-1">
        {label}
      </div>

      {/* Custom Illuminated 5x7 Dot-Matrix Digital Display */}
      <DotMatrixNumber val={value} />

      {/* Recessed 3x4 Lower Indicator Grid Enclosure */}
      <DigitStateGrid label={label} value={numericVal} />
    </div>
  );
};
