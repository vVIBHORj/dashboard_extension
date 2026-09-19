import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WorldClockMap } from './components/WorldClockMap';
import { CityClockCards } from './components/CityClockCards';
import { CitySearch } from './components/CitySearch';
import { ClockControlPanel } from './components/ClockControlPanel';
import { NotesPanel } from './components/NotesPanel';
import { WeatherPanel } from './components/WeatherPanel';
import { SettingsModal } from './components/SettingsModal';

import { CityNode, AppSettings } from './types';
import { storageService } from './services/storageService';
import { clockService } from './services/clockService';
import { audioService } from './services/audioService';

export const App: React.FC = () => {
  const [cities, setCities] = useState<CityNode[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityNode | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    use24Hour: true,
    temperatureUnit: 'C',
    soundEnabled: true,
    soundVolume: 0.7,
    defaultTab: 'WORLD CLOCK',
    reducedMotion: false
  });

  const [activeTab, setActiveTab] = useState<'WORLD CLOCK' | 'STOPWATCH' | 'TIMER'>('WORLD CLOCK');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Time state for right panel digital display
  const [rightTime, setRightTime] = useState({ hours: '22', minutes: '16', seconds: '20' });

  // Initial Data Loading
  useEffect(() => {
    Promise.all([
      storageService.getCities(),
      storageService.getSelectedCity(),
      storageService.getSettings()
    ]).then(([loadedCities, loadedSelected, loadedSettings]) => {
      setCities(loadedCities);
      setSelectedCity(loadedSelected);
      setSettings(loadedSettings);
      setActiveTab(loadedSettings.defaultTab || 'WORLD CLOCK');
    });
  }, []);

  // Real-time ticking engine for selected city digital display
  useEffect(() => {
    const updateTime = () => {
      if (selectedCity) {
        const { hours, minutes, seconds } = clockService.getTimeForZone(selectedCity.timezone, settings.use24Hour);
        setRightTime({ hours, minutes, seconds });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedCity, settings.use24Hour]);

  const playClick = () => {
    audioService.playClick(settings.soundEnabled, settings.soundVolume);
  };

  const playAlarm = () => {
    audioService.playAlarm(settings.soundEnabled, settings.soundVolume);
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification('Control Terminal Timer', {
        body: 'Countdown timer finished!',
        icon: 'icon48.png'
      });
    }
  };

  const handleSelectCity = (city: CityNode) => {
    playClick();
    setSelectedCity(city);
    storageService.saveSelectedCity(city.id);
  };

  const handleAddCity = (city: CityNode) => {
    playClick();
    if (!cities.some(c => c.id === city.id)) {
      const updated = [...cities, city];
      setCities(updated);
      setSelectedCity(city);
      storageService.saveCities(updated);
      storageService.saveSelectedCity(city.id);
    } else {
      setSelectedCity(city);
      storageService.saveSelectedCity(city.id);
    }
  };

  const handleRemoveCity = () => {
    playClick();
    if (cities.length <= 1 || !selectedCity) return;
    const updated = cities.filter(c => c.id !== selectedCity.id);
    setCities(updated);
    const nextSelected = updated[0];
    setSelectedCity(nextSelected);
    storageService.saveCities(updated);
    storageService.saveSelectedCity(nextSelected.id);
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    storageService.saveSettings(newSettings);
  };

  if (!selectedCity) {
    return (
      <div className="w-screen h-screen bg-[#07080a] flex items-center justify-center text-xs font-mono text-[#5c6374]">
        INITIALIZING CONTROL TERMINAL...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#090a0d] via-[#07080a] to-[#050608] text-[#dcd6cd] flex flex-col justify-between font-sans overflow-hidden p-2 sm:p-3">
      {/* Top Header */}
      <Header
        soundEnabled={settings.soundEnabled}
        soundVolume={settings.soundVolume}
        onToggleSound={() => {
          playClick();
          handleSaveSettings({ ...settings, soundEnabled: !settings.soundEnabled });
        }}
        onVolumeChange={(vol) => {
          handleSaveSettings({ ...settings, soundVolume: vol, soundEnabled: vol > 0 });
        }}
        onOpenSettings={() => {
          playClick();
          setIsSettingsOpen(true);
        }}
      />

      {/* Main Content Area - Fits 100% Height without scrolling */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto my-1 flex flex-col justify-between gap-2.5 overflow-hidden">
        {/* Top 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 items-stretch overflow-hidden">
          
          {/* LEFT COLUMN: 7 cols (~55%) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-gradient-to-b from-[#111318] via-[#101216] to-[#0c0d11] border border-[#1b1e26] rounded-lg p-3 shadow-2xl overflow-hidden">
            {/* High-Fidelity Dotted World Clock Map */}
            <div className="flex-1 flex items-center justify-center my-1 overflow-hidden min-h-0">
              <WorldClockMap
                cities={cities}
                selectedCity={selectedCity}
                onSelectCity={handleSelectCity}
                use24Hour={settings.use24Hour}
              />
            </div>

            {/* City Search Bar & Remove Control */}
            <div className="shrink-0">
              <CitySearch
                onAddCity={handleAddCity}
                onRemoveCity={handleRemoveCity}
                selectedCity={selectedCity}
                canRemove={cities.length > 1}
              />
            </div>

            {/* Horizontally Scrolling City Cards */}
            <div className="shrink-0">
              <CityClockCards
                cities={cities}
                selectedCity={selectedCity}
                onSelectCity={handleSelectCity}
                use24Hour={settings.use24Hour}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: 5 cols (~45%) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-2.5 overflow-hidden">
            {/* Clock Control Panel (World Clock, Stopwatch, Timer) */}
            <div className="shrink-0">
              <ClockControlPanel
                hours={rightTime.hours}
                minutes={rightTime.minutes}
                seconds={rightTime.seconds}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onPlayClick={playClick}
                onTimerComplete={playAlarm}
              />
            </div>

            {/* Local Notes Panel */}
            <div className="flex-1 min-h-0">
              <NotesPanel onPlayClick={playClick} />
            </div>
          </div>
        </div>

        {/* BOTTOM FULL-WIDTH WEATHER PREVIEW PANEL */}
        <div className="shrink-0">
          <WeatherPanel
            lat={selectedCity.lat}
            lng={selectedCity.lng}
            locationName={selectedCity.name}
          />
        </div>
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onSave={handleSaveSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
};
