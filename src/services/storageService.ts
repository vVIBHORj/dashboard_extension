import { CityNode, AppSettings } from '../types';

const STORAGE_KEYS = {
  CITIES: 'ctrl_term_cities',
  SELECTED_CITY: 'ctrl_term_selected_city',
  WEATHER_LOCATION: 'ctrl_term_weather_location',
  NOTES: 'ctrl_term_notes',
  SETTINGS: 'ctrl_term_settings',
  TIMER_STATE: 'ctrl_term_timer_state',
};

const DEFAULT_CITIES: CityNode[] = [
  {
    id: 'singapore',
    name: 'SINGAPORE',
    country: 'SINGAPORE',
    region: 'SINGAPORE',
    timezone: 'Asia/Singapore',
    lat: 1.3521,
    lng: 103.8198,
    mapX: 538,
    mapY: 228
  },
  {
    id: 'london',
    name: 'LONDON',
    country: 'UNITED KINGDOM',
    region: 'LONDON',
    timezone: 'Europe/London',
    lat: 51.5074,
    lng: -0.1278,
    mapX: 342,
    mapY: 106
  },
  {
    id: 'new-york',
    name: 'NEW YORK',
    country: 'UNITED STATES',
    region: 'NEW YORK',
    timezone: 'America/New_York',
    lat: 40.7128,
    lng: -74.0060,
    mapX: 202,
    mapY: 130
  },
  {
    id: 'tokyo',
    name: 'TOKYO',
    country: 'JAPAN',
    region: 'TOKYO',
    timezone: 'Asia/Tokyo',
    lat: 35.6762,
    lng: 139.6503,
    mapX: 618,
    mapY: 140
  },
  {
    id: 'berlin',
    name: 'BERLIN',
    country: 'GERMANY',
    region: 'BERLIN',
    timezone: 'Europe/Berlin',
    lat: 52.5200,
    lng: 13.4050,
    mapX: 376,
    mapY: 102
  }
];

const DEFAULT_NOTES = `• Math Assignment 4B [Fri]
• Math 5 Tutorial (incl. assigned qn)
• EFI Graduation Consent Form
• Queenstown Homework Cafe Signup (WA)
• Clinic Kaki Forms - Done
• Project Tomodachi Form - Done
• EFI Graduation Volunteer Role Selection - Done`;

const DEFAULT_SETTINGS: AppSettings = {
  use24Hour: true,
  temperatureUnit: 'C',
  soundEnabled: true,
  soundVolume: 0.7,
  defaultTab: 'WORLD CLOCK',
  reducedMotion: false
};

const isChromeStorageAvailable = () => {
  return typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;
};

export const storageService = {
  async getCities(): Promise<CityNode[]> {
    if (isChromeStorageAvailable()) {
      return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEYS.CITIES], (result) => {
          if (result[STORAGE_KEYS.CITIES] && Array.isArray(result[STORAGE_KEYS.CITIES])) {
            resolve(result[STORAGE_KEYS.CITIES]);
          } else {
            resolve(DEFAULT_CITIES);
          }
        });
      });
    } else {
      const stored = localStorage.getItem(STORAGE_KEYS.CITIES);
      return stored ? JSON.parse(stored) : DEFAULT_CITIES;
    }
  },

  async saveCities(cities: CityNode[]): Promise<void> {
    if (isChromeStorageAvailable()) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEYS.CITIES]: cities }, () => resolve());
      });
    } else {
      localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(cities));
    }
  },

  async getSelectedCity(): Promise<CityNode> {
    const cities = await this.getCities();
    if (isChromeStorageAvailable()) {
      return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEYS.SELECTED_CITY], (result) => {
          const found = cities.find(c => c.id === result[STORAGE_KEYS.SELECTED_CITY]);
          resolve(found || cities[0] || DEFAULT_CITIES[0]);
        });
      });
    } else {
      const storedId = localStorage.getItem(STORAGE_KEYS.SELECTED_CITY);
      const found = cities.find(c => c.id === storedId);
      return found || cities[0] || DEFAULT_CITIES[0];
    }
  },

  async saveSelectedCity(cityId: string): Promise<void> {
    if (isChromeStorageAvailable()) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEYS.SELECTED_CITY]: cityId }, () => resolve());
      });
    } else {
      localStorage.setItem(STORAGE_KEYS.SELECTED_CITY, cityId);
    }
  },

  async getNotes(): Promise<string> {
    if (isChromeStorageAvailable()) {
      return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEYS.NOTES], (result) => {
          resolve(result[STORAGE_KEYS.NOTES] !== undefined ? result[STORAGE_KEYS.NOTES] : DEFAULT_NOTES);
        });
      });
    } else {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTES);
      return stored !== null ? stored : DEFAULT_NOTES;
    }
  },

  async saveNotes(notes: string): Promise<void> {
    if (isChromeStorageAvailable()) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEYS.NOTES]: notes }, () => resolve());
      });
    } else {
      localStorage.setItem(STORAGE_KEYS.NOTES, notes);
    }
  },

  async getSettings(): Promise<AppSettings> {
    if (isChromeStorageAvailable()) {
      return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEYS.SETTINGS], (result) => {
          resolve({ ...DEFAULT_SETTINGS, ...result[STORAGE_KEYS.SETTINGS] });
        });
      });
    } else {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    }
  },

  async saveSettings(settings: AppSettings): Promise<void> {
    if (isChromeStorageAvailable()) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings }, () => resolve());
      });
    } else {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }
  }
};
