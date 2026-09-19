import React, { useState } from 'react';
import { DigitalTimeDisplay } from './DigitalTimeDisplay';
import { Stopwatch } from './Stopwatch';
import { Timer } from './Timer';

interface ClockControlPanelProps {
  hours: string;
  minutes: string;
  seconds: string;
  activeTab: 'WORLD CLOCK' | 'STOPWATCH' | 'TIMER';
  onTabChange: (tab: 'WORLD CLOCK' | 'STOPWATCH' | 'TIMER') => void;
  onPlayClick?: () => void;
  onTimerComplete?: () => void;
}

export const ClockControlPanel: React.FC<ClockControlPanelProps> = ({
  hours,
  minutes,
  seconds,
  activeTab,
  onTabChange,
  onPlayClick,
  onTimerComplete
}) => {
  const [synced, setSynced] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    onPlayClick?.();
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
    }, 600);
  };

  return (
    <div className="bg-[#101216] border border-[#1b1e26] rounded-lg p-4 shadow-xl flex flex-col justify-between mb-4">
      {/* Top Segmented Navigation Tabs */}
      <div className="bg-[#0b0c0f] p-1 border border-[#181b22] rounded-md grid grid-cols-3 gap-1 mb-4">
        {(['WORLD CLOCK', 'STOPWATCH', 'TIMER'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                onPlayClick?.();
                onTabChange(tab);
              }}
              className={`py-2 px-3 text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-200 rounded relative ${
                isActive
                  ? 'bg-[#181b22] text-[#f5f0db] shadow border border-[#272b36]'
                  : 'text-[#586072] hover:text-[#9ea6b8] hover:bg-[#12141a]'
              }`}
            >
              {tab}
              {isActive && (
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_5px_#ef4444]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Header & Status Indicator */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#798296] uppercase">
          {activeTab}
        </div>
        
        {activeTab === 'WORLD CLOCK' && (
          <button
            onClick={handleSync}
            className="text-[9px] font-mono font-semibold tracking-wider text-[#22c55e] hover:text-[#4ade80] flex items-center gap-1.5 transition-colors"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${syncing ? 'bg-[#f59e0b] animate-ping' : 'bg-[#22c55e] glow-green'}`} />
            <span>{syncing ? 'SYNCING...' : synced ? 'NODE SYNC' : 'OFFLINE'}</span>
          </button>
        )}
      </div>

      {/* Tab Content Rendering */}
      {activeTab === 'WORLD CLOCK' && (
        <DigitalTimeDisplay hours={hours} minutes={minutes} seconds={seconds} />
      )}

      {activeTab === 'STOPWATCH' && (
        <Stopwatch onPlayClick={onPlayClick} />
      )}

      {activeTab === 'TIMER' && (
        <Timer onPlayClick={onPlayClick} onTimerComplete={onTimerComplete} />
      )}
    </div>
  );
};
