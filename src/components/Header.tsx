import React from 'react';
import { Volume2, VolumeX, Settings } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  soundVolume: number;
  onToggleSound: () => void;
  onVolumeChange: (vol: number) => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  soundVolume,
  onToggleSound,
  onVolumeChange,
  onOpenSettings
}) => {
  return (
    <header className="w-full bg-[#0a0b0d] border-b border-[#1b1e26] px-6 py-2.5 flex items-center justify-between select-none">
      {/* LEFT: Decorative Matrix Grid */}
      <div className="flex items-center gap-4">
        <div className="grid grid-cols-8 gap-1 opacity-60">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-[#f5f0db]' : i % 5 === 0 ? 'bg-[#ef4444]' : 'bg-[#2a2e38]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CENTER: Clean Minimalist Instrument Spacer */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_6px_#ef4444]" />
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#525a6b] font-semibold uppercase">
          CONTROL TERMINAL SYSTEM v1.0
        </span>
      </div>

      {/* RIGHT: Status Dots & SOUND Control & Settings */}
      <div className="flex items-center gap-5">
        {/* Two Status Indicator Dots matching reference header */}
        <div className="flex items-center gap-2 pr-2 border-r border-[#1a1d26]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f5f0db] shadow-[0_0_4px_#f5f0db]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] glow-green" />
        </div>

        {/* SOUND pill / button + slider */}
        <div className="flex items-center gap-3 bg-[#101216] border border-[#1c1f28] rounded-full px-3 py-1">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#dedad0] hover:text-[#f5f0db] uppercase transition-colors"
          >
            {soundEnabled && soundVolume > 0 ? (
              <Volume2 className="w-3.5 h-3.5 text-[#22c55e]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#ef4444]" />
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
            className="w-16 h-1 bg-[#1c202a] rounded-lg appearance-none cursor-pointer accent-[#f5f0db]"
          />
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded text-[#71798b] hover:text-[#dedad0] hover:bg-[#12151c] transition-colors"
          title="Open Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
