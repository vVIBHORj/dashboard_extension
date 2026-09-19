import React from 'react';
import { ClockDigitCard } from './ClockDigitCard';

interface DigitalTimeDisplayProps {
  hours: string;
  minutes: string;
  seconds: string;
}

export const DigitalTimeDisplay: React.FC<DigitalTimeDisplayProps> = ({ hours, minutes, seconds }) => {
  return (
    <div className="grid grid-cols-3 gap-3 w-full items-stretch">
      <ClockDigitCard label="HOURS" value={hours} />
      <ClockDigitCard label="MINUTES" value={minutes} />
      <ClockDigitCard label="SECONDS" value={seconds} />
    </div>
  );
};
