import React from 'react';
import { AppSettings } from '../types';
import { X } from 'lucide-react';

interface SettingsModalProps {
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ settings, onSave, onClose }) => {
  const [current, setCurrent] = React.useState<AppSettings>(settings);

  const handleToggle24h = () => {
    const updated = { ...current, use24Hour: !current.use24Hour };
    setCurrent(updated);
    onSave(updated);
  };

  const handleToggleTempUnit = () => {
    const updated = { ...current, temperatureUnit: (current.temperatureUnit === 'C' ? 'F' : 'C') as 'C' | 'F' };
    setCurrent(updated);
    onSave(updated);
  };

  const handleToggleSound = () => {
    const updated = { ...current, soundEnabled: !current.soundEnabled };
    setCurrent(updated);
    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#101216] border border-[#232733] rounded-lg p-5 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#1b1e28] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#dedad0] uppercase">
              TERMINAL SETTINGS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#666d7e] hover:text-[#dedad0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* 12h / 24h Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-[#161820]">
            <div>
              <div className="text-xs font-mono text-[#dedad0] font-semibold">24-Hour Clock Format</div>
              <div className="text-[10px] font-mono text-[#5c6374]">Toggle between 24h (22:16) and 12h (10:16 PM)</div>
            </div>
            <button
              onClick={handleToggle24h}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${current.use24Hour ? 'bg-[#22c55e]' : 'bg-[#1e222b]'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-[#0a0b0d] transition-transform ${current.use24Hour ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* °C / °F Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-[#161820]">
            <div>
              <div className="text-xs font-mono text-[#dedad0] font-semibold">Temperature Unit</div>
              <div className="text-[10px] font-mono text-[#5c6374]">Display weather in Celsius or Fahrenheit</div>
            </div>
            <button
              onClick={handleToggleTempUnit}
              className="px-3 py-1 bg-[#181b24] border border-[#272b38] rounded text-xs font-mono font-bold text-[#f5f0db]"
            >
              °{current.temperatureUnit}
            </button>
          </div>

          {/* Sound Enabled */}
          <div className="flex items-center justify-between py-2 border-b border-[#161820]">
            <div>
              <div className="text-xs font-mono text-[#dedad0] font-semibold">System Audio Effects</div>
              <div className="text-[10px] font-mono text-[#5c6374]">Enable subtle click sounds and timer alarms</div>
            </div>
            <button
              onClick={handleToggleSound}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${current.soundEnabled ? 'bg-[#22c55e]' : 'bg-[#1e222b]'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-[#0a0b0d] transition-transform ${current.soundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-[#1b1e28] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#181b24] border border-[#2a2e39] rounded text-xs font-mono text-[#dedad0] hover:bg-[#202430] transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
