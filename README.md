# O-wind-turbine-Urban-Wind-Intelligence-

## O-WIND AI: Smart Urban Wind Energy & Environmental Intelligence

> **“Turning Urban Wind Into Intelligent Clean Energy”**  
> *University Sustainable Technology Competition Project (SDG 2026)*  
> *Dhaka High-Rise Urban Micro-Grid Testbed, Bangladesh*

---

## 🌟 Executive Overview

**O-WIND AI** is a desktop-first smart-city command center and edge microgrid management platform designed for dense urban environments like Dhaka, Bangladesh. Unlike conventional 3-blade Horizontal Axis Wind Turbines (HAWTs) that stall in turbulent city winds, O-WIND AI harnesses a compact omnidirectional spherical rotor operating on the **Bernoulli pressure differential principle**. It extracts rotational kinetic energy from 360° horizontal winds and 3D upward thermal drafts without mechanical yaw steering.

The platform integrates:
1. **WIND:** 3D Omnidirectional aerodynamic energy harvesting.
2. **ENERGY:** Synchronous rectification, micro-MPPT routing, and LiFePO4 battery management.
3. **AI:** Neural computational fluid dynamics (CFD) for building parapet placement optimization.
4. **AIR:** Autonomous self-powered environmental sensing (PM2.5, PM10, CO2, AQI) with wind dispersion modeling.
5. **BANGLADESH:** Tailored urban micro-grid solutions addressing Dhaka's nighttime load-shedding and air quality challenges.

---

## 🚀 Key Features

### 1. Dashboard (Command Center)
- **Interactive Three.js 3D Rotor:** Real-time spherical casing with 6 helical aerodynamic vents, dynamic rotational response (186 RPM at 3.42 m/s), multi-directional wind streamlines, and exploded CAD assembly mode.
- **Physical Conversion Flow:** Animated pipeline from Wind Kinetic → O-Wind Shell → Rotation → Generator → Battery / Load.
- **7 Live Telemetry Cards:** Wind Speed, Direction, RPM, Power, Cumulative Energy (148.8 J Reference Prototype Result), Battery SoC, and PM2.5.
- **Rolling Sensor Charts:** Dynamic SVG telemetry streams for power, wind velocity, and particulates.
- **AI Edge Insights:** Live advisory on directional wind peaks and battery charging priorities.

### 2. Live Turbine Telemetry
- **Split Dynamics:** Aerodynamic inflow, mechanical shaft torque, angular velocity ($\omega$), and 3-phase PMG generator output.
- **Real-Time Oscilloscope:** High-frequency trace comparing rotor RPM to electrical power output.
- **Simulation Control:** Live vs. Demo mode toggles, Start/Pause, Reset, and 1x/2x/5x speed multipliers.

### 3. AI Site Optimizer (Signature Feature)
- **Isometric Building Siting:** Select Dhaka high-rises (Gulshan Commercial Tower, Motijheel Highrise Centre, University Tech Hub).
- **Interactive Placement Pins:** Rooftop A (92%), South Facade (84%), North Facade (73%), Rooftop B (61%).
- **Multi-Stage AI Pipeline:** Real-time simulation from wind vector collection to boundary layer CFD mesh evaluation.
- **Comparison Mode:** Side-by-side performance benchmarking across multiple building archetypes.

### 4. Urban Wind & Canyon Dynamics
- **Street Canyon Simulation:** Multi-building airflow visualization demonstrating Venturi acceleration and upward thermal drafts.
- **360° Polar Wind-Rose:** 16-point directional frequency distribution highlighting Dhaka's 137° SE prevailing winds.
- **Engineering Comparison:** Systematic breakdown of why omnidirectional turbines excel over stalled 3-blade HAWTs.

### 5. Smart Energy Management & Microgrid
- **24-Hour Solar + O-Wind Hybrid Simulation:** Demonstrates how nighttime urban winds compensate for zero solar generation during Dhaka's peak residential blackout hours (7 PM – 11 PM).
- **Dynamic Sankey Flow:** Power allocation between battery storage, active direct loads, and conversion losses.
- **Controllable Smart Loads:** Toggle individual consumers (LED beacons, USB ports, LoRaWAN transceivers, sensor suites).

### 6. Air Intelligence Sentinel
- **8-Parameter Suite:** PM2.5, PM10, CO2, Temperature, Humidity, Wind Speed, Direction, and Barometric Pressure.
- **Correlation Engine:** Visualizes the inverse correlation between urban wind speed and particulate concentration (wind dispersion effect).

### 7. AI Pollution Forecast (+5 Hours)
- **Temporal Trajectory:** Clear visual demarcation between historical observed measurements and AI predicted concentrations.
- **Confidence Intervals:** 95% confidence bands and prototype model attribution.

### 8. Research Analytics
- **Aerodynamic Betz Bound Curve:** Empirical prototype power curve ($P \propto v^3$) vs. theoretical limits.
- **Export & Reporting:** Instant CSV telemetry export and formal scientific PDF/Markdown report generator.

### 9. Bangladesh Wind Intelligence Map
- **Interactive GIS Map:** National wind speed, power density, and AI potential layers with coastal and urban heatmaps.
- **Dhaka Metro Zoom:** Micro-corridor analysis for Gulshan, Banani, Motijheel, Kawran Bazar, and Dhanmondi.

### 10. Research Lab & Technical Dossier
- **8-Stage "How It Works":** Interactive breakdown of Bernoulli fluid equations, shaft dynamics, and electrical power conditioning.
- **CAD Specs & Materials:** PETG gyroid core, Si3N4 ceramic hybrid bearings, and 9-phase engineering timeline.
- **Data Trust Compliance (Rule 21):** Strict differentiation between reference logbook benchmarks (0.496 W, 148.8 J) and measured prototype values.

### 11. UN Sustainable Development Goals (SDGs)
- **Primary:** **SDG 7** (Affordable and Clean Energy)
- **Secondary:** **SDG 9** (Innovation), **SDG 11** (Sustainable Cities), **SDG 12** (Responsible Production), **SDG 13** (Climate Action)
- **Additional:** **SDG 3** (Good Health & Well-being via air quality alerts)

### 12. 5-Minute Competition Presentation Mode
- **Guided Slideshow Sequence:** 8 curated slides designed for university judges with timer, presenter notes, and finale confetti celebration.

### 13. Public Landing Page ("THE WIND BETWEEN THE BUILDINGS")
- High-impact public landing page with 3D hero visualization and direct command center launch CTAs.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `C` | Toggle 5-Minute Competition Presentation Mode |
| `Space` | Pause / Resume Live Telemetry Simulation |
| `L` | Toggle between Command Center and Public Landing Page |
| `M` | Toggle Futuristic Web Audio Feedback |
| `1` – `9` | Quick jump to specific command center screens |

---

## 🛠️ Technology Stack

- **Framework:** React 18, TypeScript, Vite 5
- **Styling:** Tailwind CSS (custom dark navy theme, cybernetic accents)
- **3D Graphics:** Three.js (WebGL interactive omnidirectional turbine)
- **Icons:** Lucide React
- **Audio:** Native HTML5 Web Audio API synthesizer
- **Charts:** Custom responsive SVG vector charts & Recharts

---

## 🏃 Running Locally

```bash
# Navigate to project directory
cd /home/safin313/.gemini/antigravity-ide/scratch/o-wind-ai

# Install dependencies (already installed)
npm install

# Start development server
npm run dev -- --host 0.0.0.0 --port 5173

# Build for production
npm run build
```

The application runs at: **`http://localhost:5173/`**
