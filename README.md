# Control Terminal - Futuristic Time + Weather + Notes Chrome Extension

A complete, production-ready dark industrial sci-fi Chrome Extension dashboard built with React, TypeScript, Vite, and Tailwind CSS. Functions as a **New Tab replacement** control terminal and offers a compact **Browser Action popup**.

## Features

- 🌐 **Interactive Vector Dot Map**: Visualizes major global city nodes with glowing status indicators, hover tooltips, and click selection.
- 🕒 **World Clock Instrument**: Real-time IANA timezone clocks with dot-matrix illuminated digit displays and system `NODE SYNC`.
- ⏱️ **Precision Stopwatch**: Millisecond-accurate stopwatch with Start/Pause/Resume, Reset, and detailed Lap history persistence.
- ⏳ **Configurable Timer**: Countdown timer with digital instrument displays, audio alerts (Web Audio API), and Chrome Notifications.
- 📝 **Local Notes Panel**: Rich editable notes editor with formatting controls (Bold, Underline, Strikethrough, Bullet lists) auto-saved to `chrome.storage.local`.
- ⛅ **Live Weather & Air Quality**: Real-time temperature, PSI/AQI, humidity, UV index, wind speed, pressure, cloud cover, visibility, and 7-day forecast powered by Open-Meteo.
- 🔊 **Sound Control**: Web Audio API synthesizer for tactile UI clicks and timer completion alarm tones.
- ⚙️ **Settings Panel**: 12h/24h toggle, °C/°F toggle, sound volume slider, and default startup configuration.
- 📱 **Browser Action Popup**: Compact popup view displaying local time, selected city, weather, and quick dashboard link.

---

## Installation & Build Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

The production output will be generated in the `dist/` directory.

---

## Loading into Google Chrome

1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** using the toggle switch in the top-right corner.
3. Click **Load unpacked**.
4. Select the `dist/` folder inside this project directory (`c:/Users/vibhor/Desktop/chrome_extension/dist`).
5. Open a **New Tab** (`Ctrl + T` or `Cmd + T`) to launch the Control Terminal!

---

## Project Structure

```
/src
  /components
    - CityClockCards.tsx     # Horizontally scrolling city cards
    - CitySearch.tsx         # City search autocomplete & remove button
    - ClockControlPanel.tsx  # Tabs container (World Clock, Stopwatch, Timer)
    - DigitalDigit.tsx       # Dot-matrix illuminated digit renderer
    - DigitalTimeDisplay.tsx # Multi-digit instrument cards
    - Header.tsx             # Top bar with sound controls & status lights
    - NotesPanel.tsx         # Local notes editor with B/U/S/• buttons
    - SettingsModal.tsx      # Terminal settings modal overlay
    - Stopwatch.tsx          # Precision stopwatch & lap history
    - Timer.tsx              # Countdown timer & notification trigger
    - WeatherPanel.tsx       # Bottom weather strip & 7-day forecast
    - WorldMap.tsx           # Dotted world map vector SVG instrument
  /services
    - audioService.ts        # Web Audio API sound generator
    - cityDatabase.ts        # World city database with coordinates
    - clockService.ts       # Timezone calculations via Intl.DateTimeFormat
    - storageService.ts      # chrome.storage.local abstraction layer
    - weatherService.ts      # Open-Meteo & Air Quality API integration
  /types
    - index.ts               # TypeScript interfaces
  App.tsx                    # Main New Tab Dashboard Application
  popup.tsx                  # Browser Action Popup Application
  main.tsx                   # React DOM entry point
  index.css                  # Tailwind & instrument glow styles
manifest.json                # Chrome Extension Manifest V3
vite.config.ts               # Vite multi-page bundler configuration
```

---

## Permissions & Privacy

- **storage**: Used to persist your added cities, selected node, notes content, sound preferences, and terminal settings.
- **notifications**: Optional notification alert when a timer reaches 00:00:00.
- **geolocation**: Optional browser geolocation to auto-detect weather location upon request.
- **No external tracking or backend required.**
