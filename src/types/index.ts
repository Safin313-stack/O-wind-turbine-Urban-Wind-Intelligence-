export type NavPage = 
  | 'dashboard'
  | 'live-turbine'
  | 'optimizer'
  | 'urban-wind'
  | 'energy'
  | 'air'
  | 'pollution-forecast'
  | 'analytics'
  | 'bangladesh-map'
  | 'research-lab'
  | 'project'
  | 'settings';

export interface TelemetryData {
  timestamp: string;
  windSpeed: number; // m/s
  windDirection: number; // degrees 0-360
  windGust: number; // m/s
  windStabilityIndex: number; // %
  rpm: number; // turbine rotational speed
  shaftTorque: number; // mNm
  voltage: number; // V
  current: number; // mA
  power: number; // W
  energyGenerated: number; // Joules (cumulative or test block)
  batteryPct: number; // %
  batteryVoltage: number; // V
  batteryCurrent: number; // mA (positive = charging, negative = discharging)
  batteryHealth: number; // %
  pm25: number; // µg/m³
  pm10: number; // µg/m³
  co2: number; // ppm
  temperature: number; // °C
  humidity: number; // %
  pressure: number; // hPa
  isLive: boolean;
}

export interface PlacementNode {
  id: string;
  name: string;
  location: string;
  aiScore: number;
  windPotential: number;
  directionSuitability: number;
  buildingExposure: number;
  turbulenceSuitability: number;
  estimatedEnergyPotential: number;
  annualYieldKwh: number;
  status: 'optimal' | 'moderate' | 'low';
  recommendation: string;
  coordinates: { x: number; y: number; z: number };
}

export interface BuildingSite {
  id: string;
  name: string;
  area: string;
  heightMeters: number;
  floors: number;
  canyonEffectRatio: number;
  avgWindSpeed: number;
  nodes: PlacementNode[];
}

export interface SmartLoad {
  id: string;
  name: string;
  category: 'lighting' | 'charging' | 'sensor' | 'compute' | 'auxiliary';
  powerWatts: number;
  priority: 'critical' | 'normal' | 'deferrable';
  isEnabled: boolean;
  status: 'active' | 'standby' | 'delayed';
}

export interface BangladeshLocation {
  id: string;
  name: string;
  division: string;
  coordinates: { lat: number; lng: number };
  svgPos: { x: number; y: number };
  avgWindSpeed: number; // m/s at 20-30m
  windPowerDensity: number; // W/m²
  potentialScore: number; // 0-100
  recommendedTurbines: number;
  urbanDensity: 'Very High' | 'High' | 'Moderate' | 'Coastal';
  isPrototypeSite: boolean;
  notes: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'ai' | 'warning' | 'info' | 'success';
  read: boolean;
}
