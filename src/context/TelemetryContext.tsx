import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { TelemetryData, SmartLoad, SystemNotification, NavPage } from '../types';

interface TelemetryContextType {
  telemetry: TelemetryData;
  history: TelemetryData[];
  isLiveMode: boolean;
  setIsLiveMode: (live: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
  resetTelemetry: () => void;
  loads: SmartLoad[];
  toggleLoad: (id: string) => void;
  notifications: SystemNotification[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  activePage: NavPage;
  setActivePage: (page: NavPage) => void;
  isCompetitionModeOpen: boolean;
  setIsCompetitionModeOpen: (open: boolean) => void;
  viewMode: 'app' | 'landing';
  setViewMode: (mode: 'app' | 'landing') => void;
  selectedBuildingId: string;
  setSelectedBuildingId: (id: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

const INITIAL_LOADS: SmartLoad[] = [
  { id: 'sensors', name: 'Environmental Sensor Suite (BME680 + Plantower)', category: 'sensor', powerWatts: 0.08, priority: 'critical', isEnabled: true, status: 'active' },
  { id: 'controller', name: 'Edge AI ESP32 Telemetry Gateway', category: 'compute', powerWatts: 0.12, priority: 'critical', isEnabled: true, status: 'active' },
  { id: 'led', name: 'Rooftop Architectural LED Beacon', category: 'lighting', powerWatts: 0.15, priority: 'normal', isEnabled: true, status: 'active' },
  { id: 'usb', name: 'Emergency USB 5V Smart Port', category: 'charging', powerWatts: 0.50, priority: 'deferrable', isEnabled: false, status: 'standby' },
  { id: 'aux', name: 'LoRaWAN Long-Range Transceiver', category: 'auxiliary', powerWatts: 0.06, priority: 'normal', isEnabled: true, status: 'active' },
];

const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'n-1',
    title: 'Optimal Wind Direction',
    message: 'South-East (137°) airflow is currently producing peak rotational torque on the omnidirectional vents.',
    timestamp: 'Just now',
    type: 'ai',
    read: false,
  },
  {
    id: 'n-2',
    title: 'Battery Reserve Stable',
    message: 'Battery at 71%. Generation exceeds baseline critical load by +0.14 W. Storage charging enabled.',
    timestamp: '3m ago',
    type: 'success',
    read: false,
  },
  {
    id: 'n-3',
    title: 'Urban Canyon Acceleration',
    message: 'Gulshan avenue wind channel created a micro-gust of 4.21 m/s at 28m building elevation.',
    timestamp: '7m ago',
    type: 'info',
    read: false,
  },
  {
    id: 'n-4',
    title: 'Air Quality Advisory',
    message: 'PM2.5 particulate levels reached 34 µg/m³. Environmental monitoring node streaming live telemetry to Dhaka grid.',
    timestamp: '15m ago',
    type: 'warning',
    read: true,
  }
];

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [activePage, setActivePage] = useState<NavPage>('dashboard');
  const [isCompetitionModeOpen, setIsCompetitionModeOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'app' | 'landing'>('app');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('gulshan-tower');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const [loads, setLoads] = useState<SmartLoad[]>(INITIAL_LOADS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // Exact reference starting point matching benchmark specifications
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    timestamp: new Date().toLocaleTimeString(),
    windSpeed: 3.42,
    windDirection: 137,
    windGust: 4.15,
    windStabilityIndex: 88,
    rpm: 186,
    shaftTorque: 20.4,
    voltage: 3.72,
    current: 104.8,
    power: 0.39,
    energyGenerated: 148.8, // Reference baseline in Joules
    batteryPct: 71,
    batteryVoltage: 3.86,
    batteryCurrent: 42.5,
    batteryHealth: 98,
    pm25: 34.2,
    pm10: 61.8,
    co2: 432,
    temperature: 28.1,
    humidity: 63.4,
    pressure: 1011.8,
    isLive: false,
  });

  const [history, setHistory] = useState<TelemetryData[]>(() => {
    // Generate initial history trace
    const initial: TelemetryData[] = [];
    const now = Date.now();
    for (let i = 24; i >= 0; i--) {
      const t = now - i * 3000;
      const noise = Math.sin(i * 0.4) * 0.4;
      const ws = Math.max(1.8, 3.42 + noise);
      const rpm = Math.round(ws * 53 + Math.cos(i) * 6);
      const power = Number((0.39 + noise * 0.08).toFixed(2));
      initial.push({
        timestamp: new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        windSpeed: Number(ws.toFixed(2)),
        windDirection: Math.round(137 + Math.sin(i * 0.3) * 6),
        windGust: Number((ws + 0.7).toFixed(2)),
        windStabilityIndex: Math.round(85 + Math.sin(i) * 5),
        rpm,
        shaftTorque: Number((rpm * 0.11).toFixed(1)),
        voltage: Number((3.7 + noise * 0.05).toFixed(2)),
        current: Number((power / 3.7 * 1000).toFixed(1)),
        power,
        energyGenerated: Number((148.8 - (24 - i) * 1.2).toFixed(1)),
        batteryPct: 71,
        batteryVoltage: 3.86,
        batteryCurrent: 40 + Math.round(noise * 10),
        batteryHealth: 98,
        pm25: Number((34.2 + Math.sin(i * 0.2) * 3).toFixed(1)),
        pm10: Number((62 + Math.sin(i * 0.2) * 5).toFixed(1)),
        co2: Math.round(430 + Math.sin(i * 0.5) * 8),
        temperature: Number((28.1 + Math.sin(i * 0.1) * 0.3).toFixed(1)),
        humidity: Number((63.4 + Math.cos(i * 0.1) * 1.2).toFixed(1)),
        pressure: 1012,
        isLive: false,
      });
    }
    return initial;
  });

  const cumulativeEnergyRef = useRef<number>(148.8);
  const batteryPctRef = useRef<number>(71);
  const tickRef = useRef<number>(0);

  // Simulation / Live Heartbeat ticker
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 1200 / simSpeed;

    const interval = setInterval(() => {
      tickRef.current += 1;
      const tick = tickRef.current;

      setTelemetry((prev) => {
        // Natural wind variance with stochastic turbulence
        const wave1 = Math.sin(tick * 0.18) * 0.45;
        const wave2 = Math.cos(tick * 0.07) * 0.3;
        const gustChance = Math.sin(tick * 0.45);
        const gustBump = gustChance > 0.85 ? 0.9 : 0;

        const baseMean = isLiveMode ? 3.65 : 3.42;
        const windSpeed = Math.max(1.4, Number((baseMean + wave1 + wave2 + (gustBump * 0.5)).toFixed(2)));
        const windGust = Number((windSpeed + 0.65 + (gustBump * 0.6)).toFixed(2));
        const windDirection = Math.round((137 + Math.sin(tick * 0.08) * 12 + 360) % 360);
        const windStabilityIndex = Math.min(99, Math.max(65, Math.round(88 - Math.abs(wave1) * 18)));

        // O-Wind omnidirectional aerodynamic response
        // Non-linear power curve with cut-in at 1.5 m/s
        const rpm = Math.round(
          windSpeed < 1.5 ? windSpeed * 20 : (windSpeed * 53.5) + Math.sin(tick * 0.3) * 5
        );
        const shaftTorque = Number((rpm * 0.11 + Math.random() * 0.3).toFixed(1));

        // Generator physics: P = k * v^3 with aerodynamic enclosure efficiency factor
        const idealPower = Math.pow(windSpeed / 3.42, 2.7) * 0.39;
        const power = Number(Math.max(0.04, Math.min(1.8, idealPower)).toFixed(2));
        const voltage = Number((3.65 + (rpm / 350) * 0.35).toFixed(2));
        const current = Number(((power / voltage) * 1000).toFixed(1));

        // Active loads calculation
        const totalLoadWatts = loads
          .filter(l => l.isEnabled)
          .reduce((acc, l) => acc + l.powerWatts, 0);

        // Energy balance (Joules = Watts * seconds)
        const dtSeconds = (intervalTime / 1000) * simSpeed;
        cumulativeEnergyRef.current += power * dtSeconds;

        // Battery net charging/discharging
        const netWatts = power - totalLoadWatts;
        const netBatteryCurrent = Number(((netWatts / 3.85) * 1000).toFixed(1));
        
        // Battery percentage gradual shift (simulating a 2000mAh 3.7V cell)
        batteryPctRef.current = Math.min(100, Math.max(10, batteryPctRef.current + (netWatts * dtSeconds) / 260));

        // Environmental sensor micro-fluctuations
        const pm25 = Number(Math.max(18, 34.2 - (windSpeed - 3.42) * 3.5 + Math.sin(tick * 0.12) * 2.2).toFixed(1));
        const pm10 = Number(Math.max(35, pm25 * 1.8 + Math.cos(tick * 0.1) * 3).toFixed(1));
        const co2 = Math.round(432 - (windSpeed - 3.42) * 8 + Math.sin(tick * 0.05) * 6);
        const temperature = Number((28.1 + Math.sin(tick * 0.02) * 0.5).toFixed(1));
        const humidity = Number((63.4 + Math.cos(tick * 0.03) * 1.5).toFixed(1));
        const pressure = Number((1011.8 + Math.sin(tick * 0.01) * 0.4).toFixed(1));

        const updated: TelemetryData = {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          windSpeed,
          windDirection,
          windGust,
          windStabilityIndex,
          rpm,
          shaftTorque,
          voltage,
          current,
          power,
          energyGenerated: Number(cumulativeEnergyRef.current.toFixed(1)),
          batteryPct: Number(batteryPctRef.current.toFixed(1)),
          batteryVoltage: Number((3.7 + (batteryPctRef.current / 100) * 0.48).toFixed(2)),
          batteryCurrent: netBatteryCurrent,
          batteryHealth: 98,
          pm25,
          pm10,
          co2,
          temperature,
          humidity,
          pressure,
          isLive: isLiveMode,
        };

        // Append to history buffer
        setHistory(prevHist => [...prevHist.slice(-29), updated]);

        return updated;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, simSpeed, isLiveMode, loads]);

  const resetTelemetry = () => {
    cumulativeEnergyRef.current = 148.8;
    batteryPctRef.current = 71;
    tickRef.current = 0;
    setTelemetry(prev => ({
      ...prev,
      windSpeed: 3.42,
      windDirection: 137,
      rpm: 186,
      power: 0.39,
      energyGenerated: 148.8,
      batteryPct: 71,
    }));
  };

  const toggleLoad = (id: string) => {
    setLoads(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.isEnabled;
        return {
          ...item,
          isEnabled: nextState,
          status: nextState ? 'active' : 'standby',
        };
      }
      return item;
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <TelemetryContext.Provider value={{
      telemetry,
      history,
      isLiveMode,
      setIsLiveMode,
      isPlaying,
      setIsPlaying,
      simSpeed,
      setSimSpeed,
      resetTelemetry,
      loads,
      toggleLoad,
      notifications,
      markNotificationAsRead,
      clearNotifications,
      activePage,
      setActivePage,
      isCompetitionModeOpen,
      setIsCompetitionModeOpen,
      viewMode,
      setViewMode,
      selectedBuildingId,
      setSelectedBuildingId,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      toggleMobileMenu,
    }}>
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};
