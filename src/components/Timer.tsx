import React, { useState, useEffect } from 'react';
import { clockService } from '../services/clockService';

interface TimerProps {
  onPlayClick?: () => void;
  onTimerComplete?: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onPlayClick, onTimerComplete }) => {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);

  const [remainingMs, setRemainingMs] = useState(5 * 60 * 1000);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && remainingMs > 0) {
      interval = setInterval(() => {
        setRemainingMs((prev) => {
          if (prev <= 1000) {
            setIsRunning(false);
            onTimerComplete?.();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingMs, onTimerComplete]);

  const handleStartPause = () => {
    onPlayClick?.();
    if (isRunning) {
      setIsRunning(false);
    } else {
      if (remainingMs <= 0) {
        const total = (inputHours * 3600 + inputMinutes * 60 + inputSeconds) * 1000;
        setRemainingMs(total);
      }
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    onPlayClick?.();
    setIsRunning(false);
    const total = (inputHours * 3600 + inputMinutes * 60 + inputSeconds) * 1000;
    setRemainingMs(total);
  };

  const applyCustomTime = (h: number, m: number, s: number) => {
    setInputHours(h);
    setInputMinutes(m);
    setInputSeconds(s);
    setIsRunning(false);
    setRemainingMs((h * 3600 + m * 60 + s) * 1000);
  };

  const { hours, minutes, seconds } = clockService.formatDuration(remainingMs);

  return (
    <div className="flex flex-col items-center w-full py-2">
      {/* Time Configuration Inputs (when stopped) */}
      {!isRunning && (
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-[#5c6374] mb-1">HRS</span>
            <input
              type="number"
              min="0"
              max="99"
              value={inputHours}
              onChange={(e) => applyCustomTime(Math.max(0, parseInt(e.target.value) || 0), inputMinutes, inputSeconds)}
              className="w-12 bg-[#090a0d] border border-[#1c1f28] rounded text-center py-1 text-xs font-mono text-[#f5f0db] focus:outline-none focus:border-[#3a3f4e]"
            />
          </div>
          <span className="text-sm font-mono text-[#444a59] mt-3">:</span>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-[#5c6374] mb-1">MIN</span>
            <input
              type="number"
              min="0"
              max="59"
              value={inputMinutes}
              onChange={(e) => applyCustomTime(inputHours, Math.max(0, parseInt(e.target.value) || 0), inputSeconds)}
              className="w-12 bg-[#090a0d] border border-[#1c1f28] rounded text-center py-1 text-xs font-mono text-[#f5f0db] focus:outline-none focus:border-[#3a3f4e]"
            />
          </div>
          <span className="text-sm font-mono text-[#444a59] mt-3">:</span>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-[#5c6374] mb-1">SEC</span>
            <input
              type="number"
              min="0"
              max="59"
              value={inputSeconds}
              onChange={(e) => applyCustomTime(inputHours, inputMinutes, Math.max(0, parseInt(e.target.value) || 0))}
              className="w-12 bg-[#090a0d] border border-[#1c1f28] rounded text-center py-1 text-xs font-mono text-[#f5f0db] focus:outline-none focus:border-[#3a3f4e]"
            />
          </div>
        </div>
      )}

      {/* Main Countdown Display */}
      <div className="flex items-center gap-2 my-2">
        <div className="bg-[#090a0d] border border-[#1b1e26] rounded px-4 py-3 text-center shadow-inner">
          <span className="text-[10px] font-mono text-[#62697a] block mb-1">HOURS</span>
          <span className="text-3xl font-mono text-[#f5f0db] font-semibold glow-digit">{hours}</span>
        </div>
        <span className="text-2xl font-mono text-[#4e5464] animate-pulse">:</span>
        <div className="bg-[#090a0d] border border-[#1b1e26] rounded px-4 py-3 text-center shadow-inner">
          <span className="text-[10px] font-mono text-[#62697a] block mb-1">MINUTES</span>
          <span className="text-3xl font-mono text-[#f5f0db] font-semibold glow-digit">{minutes}</span>
        </div>
        <span className="text-2xl font-mono text-[#4e5464] animate-pulse">:</span>
        <div className="bg-[#090a0d] border border-[#1b1e26] rounded px-4 py-3 text-center shadow-inner">
          <span className="text-[10px] font-mono text-[#62697a] block mb-1">SECONDS</span>
          <span className="text-3xl font-mono text-[#f5f0db] font-semibold glow-digit">{seconds}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 my-3">
        <button
          onClick={handleStartPause}
          className={`px-5 py-2 rounded text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 border ${
            isRunning
              ? 'border-[#ef4444]/60 bg-[#1f1315] text-[#ef4444] hover:bg-[#2a171a]'
              : 'border-[#22c55e]/60 bg-[#121f17] text-[#22c55e] hover:bg-[#16291e]'
          }`}
        >
          {isRunning ? 'PAUSE' : 'START'}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded text-xs font-mono font-bold tracking-widest uppercase border border-[#2a2e39] bg-[#12141a] text-[#848b9c] hover:text-[#dedad0] hover:bg-[#181b22] transition-all"
        >
          RESET
        </button>
      </div>
    </div>
  );
};
