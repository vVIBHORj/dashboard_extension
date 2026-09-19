import React, { useState } from 'react';
import { DigitalTimeDisplay } from './DigitalTimeDisplay';
import { Stopwatch } from './Stopwatch';
import { Timer } from './Timer';
import { Volume2, VolumeX, Settings } from 'lucide-react';

interface ClockControlPanelProps {
  hours: string;
  minutes: string;
  seconds: string;
  activeTab: 'WORLD CLOCK' | 'STOPWATCH' | 'TIMER';
  onTabChange: (tab: 'WORLD CLOCK' | 'STOPWATCH' | 'TIMER') => void;
  onPlayClick?: () => void;
  onTimerComplete?: () => void;
  soundEnabled: boolean;
  soundVolume: number;
  onToggleSound: () => void;
  onVolumeChange: (vol: number) => void;
  onOpenSettings: () => void;
}

export const ClockControlPanel: React.FC<ClockControlPanelProps> = ({
  hours,
  minutes,
  seconds,
  activeTab,
  onTabChange,
  onPlayClick,
  onTimerComplete,
  soundEnabled,
  soundVolume,
  onToggleSound,
  onVolumeChange,
  onOpenSettings
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
    <div className="bg-gradient-to-b from-[#111318] via-[#101216] to-[#0c0d11] border border-[#1b1e26] rounded-lg p-3.5 shadow-xl flex flex-col justify-between">
      {/* Top Segmented Navigation Tabs */}
      <div className="bg-[#0b0c0f] p-1 border border-[#181b22] rounded-md grid grid-cols-3 gap-1 mb-3">
        {(['WORLD CLOCK', 'STOPWATCH', 'TIMER'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                onPlayClick?.();
                onTabChange(tab);
              }}
              className={`py-1.5 px-3 text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-200 rounded relative ${
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

      {/* Header, Status Indicators & Sound / Settings Controls */}
      <div className="flex items-center justify-between mb-3 px-1 flex-wrap gap-2">
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#798296] uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_4px_#ef4444]" />
          <span>{activeTab}</span>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === 'WORLD CLOCK' && (
            <button
              onClick={handleSync}
              className="text-[9px] font-mono font-semibold tracking-wider text-[#22c55e] hover:text-[#4ade80] flex items-center gap-1.5 transition-colors bg-[#0b0c0f] border border-[#181b22] px-2 py-1 rounded"
              title="Synchronize node time"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${syncing ? 'bg-[#f59e0b] animate-ping' : 'bg-[#22c55e] glow-green'}`} />
              <span>{syncing ? 'SYNCING...' : synced ? 'NODE SYNC' : 'OFFLINE'}</span>
            </button>
          )}

          {/* Relocated SOUND Controls */}
          <div className="flex items-center gap-2 bg-[#0b0c0f] border border-[#181b22] rounded-full px-2.5 py-0.5">
            <button
              onClick={onToggleSound}
              className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-wider text-[#dedad0] hover:text-[#f5f0db] uppercase transition-colors"
              title="Toggle Audio"
            >
              {soundEnabled && soundVolume > 0 ? (
                <Volume2 className="w-3 h-3 text-[#22c55e]" />
              ) : (
                <VolumeX className="w-3 h-3 text-[#ef4444]" />
              )}
              <span>SOUND</span>
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundEnabled ? soundVolume : 0}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-12 h-1 bg-[#1c202a] rounded-lg appearance-none cursor-pointer accent-[#f5f0db]"
              title={`Volume: ${Math.round(soundVolume * 100)}%`}
            />
          </div>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="p-1 rounded bg-[#0b0c0f] border border-[#181b22] text-[#71798b] hover:text-[#dedad0] hover:bg-[#12151c] transition-colors"
            title="Open Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
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
