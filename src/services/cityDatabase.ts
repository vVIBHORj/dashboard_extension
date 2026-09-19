import { CityNode } from '../types';

export const ALL_CITY_NODES: CityNode[] = [
  { id: 'singapore', name: 'SINGAPORE', country: 'SINGAPORE', region: 'SINGAPORE', timezone: 'Asia/Singapore', lat: 1.3521, lng: 103.8198, mapX: 538, mapY: 228 },
  { id: 'london', name: 'LONDON', country: 'UNITED KINGDOM', region: 'LONDON', timezone: 'Europe/London', lat: 51.5074, lng: -0.1278, mapX: 342, mapY: 106 },
  { id: 'new-york', name: 'NEW YORK', country: 'UNITED STATES', region: 'NEW YORK', timezone: 'America/New_York', lat: 40.7128, lng: -74.0060, mapX: 202, mapY: 130 },
  { id: 'tokyo', name: 'TOKYO', country: 'JAPAN', region: 'TOKYO', timezone: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503, mapX: 618, mapY: 140 },
  { id: 'berlin', name: 'BERLIN', country: 'GERMANY', region: 'BERLIN', timezone: 'Europe/Berlin', lat: 52.5200, lng: 13.4050, mapX: 376, mapY: 102 },
  { id: 'delhi', name: 'DELHI', country: 'INDIA', region: 'DELHI', timezone: 'Asia/Kolkata', lat: 28.6139, lng: 77.2090, mapX: 486, mapY: 154 },
  { id: 'mumbai', name: 'MUMBAI', country: 'INDIA', region: 'MAHARASHTRA', timezone: 'Asia/Kolkata', lat: 19.0760, lng: 72.8777, mapX: 476, mapY: 176 },
  { id: 'dubai', name: 'DUBAI', country: 'UNITED ARAB EMIRATES', region: 'DUBAI', timezone: 'Asia/Dubai', lat: 25.2048, lng: 55.2708, mapX: 440, mapY: 162 },
  { id: 'sydney', name: 'SYDNEY', country: 'AUSTRALIA', region: 'NEW SOUTH WALES', timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093, mapX: 642, mapY: 298 },
  { id: 'san-francisco', name: 'SAN FRANCISCO', country: 'UNITED STATES', region: 'CALIFORNIA', timezone: 'America/Los_Angeles', lat: 37.7749, lng: -122.4194, mapX: 110, mapY: 138 },
  { id: 'los-angeles', name: 'LOS ANGELES', country: 'UNITED STATES', region: 'CALIFORNIA', timezone: 'America/Los_Angeles', lat: 34.0522, lng: -118.2437, mapX: 118, mapY: 144 },
  { id: 'paris', name: 'PARIS', country: 'FRANCE', region: 'ILE-DE-FRANCE', timezone: 'Europe/Paris', lat: 48.8566, lng: 2.3522, mapX: 350, mapY: 112 },
  { id: 'toronto', name: 'TORONTO', country: 'CANADA', region: 'ONTARIO', timezone: 'America/Toronto', lat: 43.6532, lng: -79.3832, mapX: 192, mapY: 124 },
  { id: 'chicago', name: 'CHICAGO', country: 'UNITED STATES', region: 'ILLINOIS', timezone: 'America/Chicago', lat: 41.8781, lng: -87.6298, mapX: 174, mapY: 128 },
  { id: 'beijing', name: 'BEIJING', country: 'CHINA', region: 'BEIJING', timezone: 'Asia/Shanghai', lat: 39.9042, lng: 116.4074, mapX: 574, mapY: 132 },
  { id: 'hong-kong', name: 'HONG KONG', country: 'HONG KONG', region: 'HONG KONG', timezone: 'Asia/Hong_Kong', lat: 22.3193, lng: 114.1694, mapX: 568, mapY: 170 },
  { id: 'seoul', name: 'SEOUL', country: 'SOUTH KOREA', region: 'SEOUL', timezone: 'Asia/Seoul', lat: 37.5665, lng: 126.9780, mapX: 594, mapY: 136 },
  { id: 'bangkok', name: 'BANGKOK', country: 'THAILAND', region: 'BANGKOK', timezone: 'Asia/Bangkok', lat: 13.7563, lng: 100.5018, mapX: 530, mapY: 190 },
  { id: 'rio-de-janeiro', name: 'RIO DE JANEIRO', country: 'BRAZIL', region: 'RIO DE JANEIRO', timezone: 'America/Sao_Paulo', lat: -22.9068, lng: -43.1729, mapX: 268, mapY: 262 },
  { id: 'cairo', name: 'CAIRO', country: 'EGYPT', region: 'CAIRO', timezone: 'Africa/Cairo', lat: 30.0444, lng: 31.2357, mapX: 412, mapY: 150 },
  { id: 'johannesburg', name: 'JOHANNESBURG', country: 'SOUTH AFRICA', region: 'GAUTENG', timezone: 'Africa/Johannesburg', lat: -26.2041, lng: 28.0473, mapX: 406, mapY: 274 },
];

export const cityDatabase = {
  searchCities(query: string): CityNode[] {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return ALL_CITY_NODES.filter(
      c => c.name.includes(q) || c.country.includes(q) || c.region.includes(q)
    );
  },

  getCityById(id: string): CityNode | undefined {
    return ALL_CITY_NODES.find(c => c.id === id);
  }
};
