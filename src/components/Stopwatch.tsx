import React, { useState, useEffect } from 'react';
import { clockService } from '../services/clockService';
import { LapTime } from '../types';

interface StopwatchProps {
  onPlayClick?: () => void;
}

export const Stopwatch: React.FC<StopwatchProps> = ({ onPlayClick }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [laps, setLaps] = useState<LapTime[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        if (startTime !== null) {
          setElapsedMs(Date.now() - startTime);
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStartPause = () => {
    onPlayClick?.();
    if (isRunning) {
      setIsRunning(false);
    } else {
      setStartTime(Date.now() - elapsedMs);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    onPlayClick?.();
    setIsRunning(false);
    setElapsedMs(0);
    setLaps([]);
    setStartTime(null);
  };

  const handleLap = () => {
    onPlayClick?.();
    if (!isRunning) return;
    const previousTotal = laps.length > 0 ? laps[0].totalTime : 0;
    const newLap: LapTime = {
      id: laps.length + 1,
      lapDuration: elapsedMs - previousTotal,
      totalTime: elapsedMs
    };
    setLaps([newLap, ...laps]);
  };

  const { hours, minutes, seconds, centis } = clockService.formatDuration(elapsedMs);

  return (
    <div className="flex flex-col items-center w-full py-2">
      {/* Main Stopwatch Digital Display */}
      <div className="flex items-center gap-2 my-4">
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
        <div className="bg-[#090a0d] border border-[#1b1e26] rounded px-2.5 py-3 text-center shadow-inner self-end mb-0.5">
          <span className="text-[8px] font-mono text-[#62697a] block mb-1">MS</span>
          <span className="text-xl font-mono text-[#e0dac3]">{centis}</span>
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
          {isRunning ? 'PAUSE' : elapsedMs > 0 ? 'RESUME' : 'START'}
        </button>

        <button
          onClick={handleLap}
          disabled={!isRunning}
          className={`px-4 py-2 rounded text-xs font-mono font-bold tracking-widest uppercase border transition-all duration-200 ${
            isRunning
              ? 'border-[#2a2e39] bg-[#12141a] text-[#dedad0] hover:bg-[#181b22]'
              : 'border-[#171920] bg-[#0c0d10] text-[#3e4352] cursor-not-allowed'
          }`}
        >
          LAP
        </button>

        <button
          onClick={handleReset}
          disabled={elapsedMs === 0}
          className={`px-4 py-2 rounded text-xs font-mono font-bold tracking-widest uppercase border transition-all duration-200 ${
            elapsedMs > 0
              ? 'border-[#2a2e39] bg-[#12141a] text-[#848b9c] hover:text-[#dedad0] hover:bg-[#181b22]'
              : 'border-[#171920] bg-[#0c0d10] text-[#3e4352] cursor-not-allowed'
          }`}
        >
          RESET
        </button>
      </div>

      {/* Lap History List */}
      {laps.length > 0 && (
        <div className="w-full mt-3 max-h-36 overflow-y-auto border border-[#1b1e26] rounded bg-[#0b0c0f] p-2">
          <div className="text-[9px] font-mono text-[#606778] tracking-widest uppercase mb-2 border-b border-[#181b22] pb-1 flex justify-between">
            <span>LAP #</span>
            <span>SPLIT</span>
            <span>TOTAL</span>
          </div>
          {laps.map((lap) => {
            const split = clockService.formatDuration(lap.lapDuration);
            const total = clockService.formatDuration(lap.totalTime);
            return (
              <div key={lap.id} className="text-xs font-mono text-[#c4beaf] flex justify-between py-1 border-b border-[#13151b] last:border-none">
                <span className="text-[#6e7687]">LAP {lap.id.toString().padStart(2, '0')}</span>
                <span>{split.minutes}:{split.seconds}.{split.centis}</span>
                <span className="text-[#e2dcce]">{total.minutes}:{total.seconds}.{total.centis}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
