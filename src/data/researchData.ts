export interface HowItWorksStage {
  id: string;
  step: number;
  title: string;
  shortTitle: string;
  summary: string;
  scientificDetail: string;
  equations?: string;
  efficiencyLoss: string;
  keyComponents: string[];
}

export const HOW_IT_WORKS_STAGES: HowItWorksStage[] = [
  {
    id: 'stage-wind',
    step: 1,
    title: 'Omnidirectional Wind Inflow',
    shortTitle: 'Wind Inflow',
    summary: 'Captures chaotic 360° horizontal winds as well as vertical building updrafts and downdrafts without yaw steering.',
    scientificDetail: 'Conventional Horizontal Axis Wind Turbines (HAWTs) require mechanical yawing systems to orient into the wind and stall when wind rapidly shifts angle. The O-Wind aerodynamic shell is geodetic and spherical, presenting uniform aerodynamic intake apertures to wind vectors approaching from any azimuth or inclination (3D omnidirectional capture).',
    equations: 'P_{kinetic} = \\frac{1}{2} \\rho A v^3',
    efficiencyLoss: 'Inlet boundary layer loss: ~4%',
    keyComponents: ['Spherical Aerodynamic Intake Shell', 'Helical Intake Vents', 'Anti-Recirculation Lip'],
  },
  {
    id: 'stage-pressure',
    step: 2,
    title: 'Bernoulli Pressure Differential',
    shortTitle: 'Pressure Difference',
    summary: 'Internal Venturi channels create asymmetric pressure zones between windward and leeward apertures, driving continuous unidirectional torque.',
    scientificDetail: 'Air entering through the windward aperture accelerates through contracted internal ducting. According to Bernoulli’s theorem, accelerated flow produces localized low pressure (high dynamic pressure, lower static pressure). The geometry is cross-ducted so that regardless of wind inflow direction, the resultant net aerodynamic force always exerts torque in the same rotational direction on the central axis.',
    equations: 'P_1 + \\frac{1}{2} \\rho v_1^2 = P_2 + \\frac{1}{2} \\rho v_2^2',
    efficiencyLoss: 'Aerodynamic friction & turbulence: ~12%',
    keyComponents: ['Venturi Internal Ducts', 'Differential Chamber Walls', 'Exhaust Apertures'],
  },
  {
    id: 'stage-rotation',
    step: 3,
    title: 'Aerodynamic Sphere Rotation',
    shortTitle: 'Rotation',
    summary: 'The spherical rotor spins smoothly on low-friction ceramic bearings, maintaining momentum through wind gusts.',
    scientificDetail: 'The spherical shell itself functions as the rotor. Rotational inertia helps buffer brief gusts and micro-turbulences typical of urban roof parapets. The cut-in wind speed is achieved at ~1.5 m/s, making it suitable for gentle urban breezes where traditional turbines remain stationary.',
    equations: '\\tau_{aero} = \\frac{1}{2} C_m \\rho A R v^2',
    efficiencyLoss: 'Rotor boundary skin drag: ~8%',
    keyComponents: ['3D-Printed PLA/PETG Spherical Rotor', 'Dual Low-Friction Hybrid Bearings', 'Dynamic Balancing Weights'],
  },
  {
    id: 'stage-shaft',
    step: 4,
    title: 'Central Structural Shaft',
    shortTitle: 'Shaft Transmission',
    summary: 'A precision stainless-steel center shaft transfers rotational mechanical energy down to the generator housing.',
    scientificDetail: 'The fixed center shaft supports the rotor via precision bearing races while isolating external environmental rain and particulate ingress from the internal electronics. Vibration dampening mounts prevent building structural resonance.',
    equations: 'P_{mech} = \\tau \\cdot \\omega = \\tau \\cdot \\frac{2\\pi \\cdot RPM}{60}',
    efficiencyLoss: 'Bearing mechanical friction: ~3%',
    keyComponents: ['8mm Precision Ground Stainless Steel Shaft', 'Vibration Isolators', 'Waterproof Dynamic Lip Seals'],
  },
  {
    id: 'stage-gear',
    step: 5,
    title: 'Transmission / Direct Drive Coupling',
    shortTitle: 'Drive Coupling',
    summary: 'Couples rotational shaft power directly to a high-efficiency neodymium micro-generator.',
    scientificDetail: 'To maximize reliability and eliminate acoustic noise in residential and office buildings, our prototype utilizes a direct-drive coupling rather than loud planetary gearboxes, minimizing maintenance and eliminating cogging resistance during startup.',
    equations: '\\eta_{trans} \\approx 96\\%',
    efficiencyLoss: 'Coupling loss: ~4%',
    keyComponents: ['Flexible Bellows Coupler', 'Direct-Drive Adapter Hub', 'Thermal Dissipation Plate'],
  },
  {
    id: 'stage-generator',
    step: 6,
    title: 'Micro 3-Phase PMG Generator',
    shortTitle: 'Generator',
    summary: 'Converts rotational torque into 3-phase alternating current via rare-earth NdFeB permanent magnets.',
    scientificDetail: 'A brushless permanent magnet generator (PMG) with low-cogging coreless stator coils induces 3-phase AC voltage with virtually zero magnetic startup friction. This allows startup even in 1.4 m/s gentle urban airflow.',
    equations: 'e(t) = -N \\frac{d\\Phi}{dt} = B \\cdot l \\cdot v',
    efficiencyLoss: 'Copper & iron core losses: ~14%',
    keyComponents: ['NdFeB Neodymium Magnet Rotor', 'Coreless Multi-Pole Copper Stator', 'Low-Cogging Magnetic Circuit'],
  },
  {
    id: 'stage-power-elec',
    step: 7,
    title: 'Power Conditioning & MPPT',
    shortTitle: 'Power Conditioning',
    summary: 'Synchronous rectification and micro-MPPT boost converter condition erratic power into clean 3.7V - 5.0V DC.',
    scientificDetail: 'A dedicated Texas Instruments / Analog Devices micro-energy harvesting IC with Maximum Power Point Tracking (MPPT) continuously matches generator impedance to instantaneous rotational speed, extracting maximum Joules across fluctuating wind velocities.',
    equations: 'P_{out} = V_{rect} \\cdot I_{rect} \\cdot \\eta_{conv}',
    efficiencyLoss: 'Rectification & DC-DC conversion: ~8%',
    keyComponents: ['Active Synchronous Rectifier', 'Micro-MPPT Boost Converter', 'Overvoltage Clamp Circuit'],
  },
  {
    id: 'stage-battery-load',
    step: 8,
    title: 'Energy Storage & Edge Loads',
    shortTitle: 'Battery & Loads',
    summary: 'Stores energy in LiFePO4 cells to continuously power IoT environmental sensors and Dhaka grid edge gateways.',
    scientificDetail: 'A 2000mAh lithium-iron-phosphate (LiFePO4) cell buffer ensures uninterruptible power even during calm periods. Intelligent edge firmware prioritizes environmental sensing (PM2.5 / PM10) while selectively shedding non-essential lighting or USB charging.',
    equations: 'E_{stored} = \\int (P_{gen} - P_{load}) dt',
    efficiencyLoss: 'Battery Coulombic round-trip: ~6%',
    keyComponents: ['LiFePO4 Safe Energy Cell', 'BMS Protection Module', 'Controllable Smart Load Switch Matrix'],
  }
];

export const PROTOTYPE_TIMELINE = [
  { phase: '01', title: 'Concept Formulation', status: 'Completed', date: 'Phase 1', description: 'Investigated Dhaka urban canyon wind patterns and identified limitation of standard 3-blade HAWTs under chaotic turbulence.' },
  { phase: '02', title: 'Aerodynamic CAD Modeling', status: 'Completed', date: 'Phase 2', description: 'Engineered geodetic spherical rotor with asymmetric helical cross-vents in Autodesk Fusion 360 and FreeCAD.' },
  { phase: '03', title: '3D Additive Manufacturing', status: 'Completed', date: 'Phase 3', description: 'Fabricated 250mm diameter prototype shell in PETG with 15% gyroid infill for optimal strength-to-weight ratio.' },
  { phase: '04', title: 'Mechanical Assembly', status: 'Completed', date: 'Phase 4', description: 'Integrated central precision 8mm ground shaft with ceramic hybrid ball bearings and dynamic rotational balance tuning.' },
  { phase: '05', title: 'Generator Integration', status: 'Completed', date: 'Phase 5', description: 'Fitted low-cogging brushless 3-phase micro-generator and calibrated startup torque thresholds down to 1.5 m/s.' },
  { phase: '06', title: 'Electrical & MPPT Circuitry', status: 'Completed', date: 'Phase 6', description: 'Built active rectification, boost MPPT circuit, and LiFePO4 battery management system (BMS).' },
  { phase: '07', title: 'IoT & Air Sensor Suite', status: 'Completed', date: 'Phase 7', description: 'Integrated Plantower PMS7003 laser particulate sensor, BME680 gas/environmental sensor, and ESP32 telemetry edge node.' },
  { phase: '08', title: 'AI Platform & Cloud Dashboard', status: 'Completed', date: 'Phase 8', description: 'Engineered web-based smart-city command center, AI building placement optimizer, and predictive pollution forecast model.' },
  { phase: '09', title: 'Controlled Wind Tunnel Testing', status: 'Current Stage', date: 'Phase 9', description: 'Empirical verification across 1.5 to 8.0 m/s wind speeds, logging rotational RPM, power generation, and particulate dispersion.' },
];

export const EXPERIMENTAL_DATA_RECORDS = [
  {
    metric: 'Peak Power Output',
    value: '0.496 W',
    condition: 'Controlled Airflow at 4.2 m/s',
    instrument: 'Precision Digital DC Power Analyzer (Yokogawa WT310)',
    date: 'Reference Logbook Baseline',
    trustLevel: 'Reference Prototype Result',
    notes: 'Reference benchmark obtained during controlled prototype run (0.496 W peak, 0.39 W sustained mean).'
  },
  {
    metric: '5-Minute Total Energy Generated',
    value: '148.8 Joules',
    condition: 'Continuous 3.42 m/s Test Sequence (300 sec)',
    instrument: 'Integrating Watt-Hour Coulomb Counter',
    date: 'Reference Logbook Baseline',
    trustLevel: 'Reference Prototype Result',
    notes: 'Corresponds to continuous power output averaging ~0.496 W over 300 seconds (148.8 J).'
  },
  {
    metric: 'Startup Cut-in Wind Speed',
    value: '1.48 m/s',
    condition: 'Ambient Rooftop Inflow (Turbulence index 14%)',
    instrument: 'Ultrasonic 3D Anemometer (Gill WindMaster)',
    date: 'Measured Test Series #4',
    trustLevel: 'Prototype Sensor Data',
    notes: 'Omnidirectional intake initiates sustained rotation without external motor assistance.'
  },
  {
    metric: 'Mean Operating RPM',
    value: '186.2 RPM',
    condition: 'Steady 3.42 m/s Urban Flow',
    instrument: 'Optical Laser Tachometer (Extech 461920)',
    date: 'Measured Test Series #4',
    trustLevel: 'Prototype Sensor Data',
    notes: 'Low acoustic signature (<28 dBA at 1 meter), fully compliant with residential rooftop standards.'
  },
  {
    metric: 'Air Particulate Sensing Sensitivity',
    value: '±1.2 µg/m³ PM2.5',
    condition: 'Concurrent Dhaka Urban Air Sampling',
    instrument: 'Calibrated Laser Optical Particle Counter (PMS7003)',
    date: 'Measured Test Series #5',
    trustLevel: 'Prototype Sensor Data',
    notes: 'Co-located with aerodynamic intake; uses turbine vortex downdraft to channel laminar air into sensor chamber.'
  }
];

export const CAD_SPECS = {
  diameter: '260 mm (Outer Spherical Shell)',
  rotorMass: '340 grams (Ultralight PETG Gyroid Core)',
  numberOfVents: '6 Helical Aerodynamic Intake/Exhaust Ports',
  aspectRatio: '1.0 (True Omnidirectional Geodetic Sphere)',
  bearingType: 'Si3N4 Ceramic Hybrid Flanged Ball Bearings',
  generatorType: 'Coreless 3-Phase Direct-Drive Permanent Magnet Generator',
  ratedVoltage: '3.7 V Nominal (DC Output Post-MPPT)',
  maxOperatingWindSpeed: '18.0 m/s (Structural Cut-out with Centrifugal Brake)',
};
