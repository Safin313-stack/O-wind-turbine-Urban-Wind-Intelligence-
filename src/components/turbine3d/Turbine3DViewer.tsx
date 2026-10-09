import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useTelemetry } from '../../context/TelemetryContext';
import { soundFx } from '../../utils/audio';
import { 
  Rotate3d, 
  Wind, 
  Play, 
  Pause, 
  Layers,
  Zap
} from 'lucide-react';

interface Turbine3DViewerProps {
  height?: string;
  showControls?: boolean;
}

export const Turbine3DViewer: React.FC<Turbine3DViewerProps> = ({
  height = '620px',
  showControls = true,
}) => {
  const { telemetry } = useTelemetry();
  const containerRef = useRef<HTMLDivElement>(null);

  // Streamlined Interactive State
  const [showAirflow, setShowAirflow] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [manualWindOverride, setManualWindOverride] = useState<number | null>(null);
  const [cadModelLoaded, setCadModelLoaded] = useState<boolean>(false);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isXray, setIsXray] = useState<boolean>(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rotorGroupRef = useRef<THREE.Group | null>(null);
  const currentRPMRef = useRef<number>(telemetry.rpm);

  // Environmental groups
  const skylineGroupRef = useRef<THREE.Group | null>(null);
  const parapetGroupRef = useRef<THREE.Group | null>(null);
  const celestialGroupRef = useRef<THREE.Group | null>(null);
  const cloudsGroupRef = useRef<THREE.Group | null>(null);
  const trafficGroupRef = useRef<THREE.Group | null>(null);
  const windParticlesRef = useRef<THREE.Points | null>(null);
  const updraftParticlesRef = useRef<THREE.Points | null>(null);
  const trafficParticlesRef = useRef<THREE.Points | null>(null);

  // Dynamic animated components
  const anemometerRotorRef = useRef<THREE.Group | null>(null);
  const hvacFanRotorRef = useRef<THREE.Group | null>(null);
  const beaconMaterialsRef = useRef<THREE.MeshBasicMaterial[]>([]);

  // Mesh & Material references
  const cadMeshRef = useRef<THREE.Mesh | null>(null);
  const cadWireframeRef = useRef<THREE.Mesh | null>(null);
  const solidCadMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const xrayCadMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const proceduralGroupRef = useRef<THREE.Group | null>(null);
  const mainSphereMeshRef = useRef<THREE.Mesh | null>(null);
  const internalCoreMeshRef = useRef<THREE.Mesh | null>(null);
  const ventGroupsRef = useRef<THREE.Group[]>([]);

  // Internal Mechanics references
  const internalMechanicsGroupRef = useRef<THREE.Group | null>(null);
  const rotatingMagnetsRef = useRef<THREE.Group | null>(null);
  const mpptLedMeshRef = useRef<THREE.Mesh | null>(null);
  const fluxRingMeshRef = useRef<THREE.Mesh | null>(null);
  const powerConduitParticlesRef = useRef<THREE.Points | null>(null);

  // Active wind velocity calculations
  const activeWindSpeed = manualWindOverride ?? telemetry.windSpeed;
  const effectiveRPM = manualWindOverride !== null 
    ? Math.round(activeWindSpeed * 54.3) 
    : telemetry.rpm;

  useEffect(() => {
    currentRPMRef.current = effectiveRPM;
  }, [effectiveRPM]);

  // 1. Procedural Skyscraper Facade Texture (Clean daytime glass curtain wall)
  const createSkyscraperTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Modern architectural glass facade
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, 256, 512);

    const rows = 24;
    const cols = 12;
    const w = 14;
    const h = 15;
    const padX = 7;
    const padY = 6;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r % 5 === 0) {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(c * (w + padX) + 6, r * (h + padY) + 4, w, 2);
          continue;
        }

        const isReflective = Math.random() > 0.4;
        ctx.fillStyle = isReflective ? '#bae6fd' : '#1e293b';
        ctx.fillRect(c * (w + padX) + 6, r * (h + padY) + 6, w, h);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1.5, 3.5);
    return tex;
  };

  // 2. Hazard Chevron Warning Texture for Rooftop Parapet
  const createHazardTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 128, 32);

    ctx.fillStyle = '#eab308';
    for (let i = -32; i < 160; i += 24) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 14, 0);
      ctx.lineTo(i + 28, 32);
      ctx.lineTo(i + 14, 32);
      ctx.closePath();
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(12, 1);
    return tex;
  };

  // 3. Photovoltaic Solar Panel Texture
  const createSolarTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, 128, 128);

    ctx.strokeStyle = '#93c5fd';
    ctx.lineWidth = 1;
    for (let x = 0; x < 128; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 128);
      ctx.stroke();
    }
    for (let y = 0; y < 128; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(128, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(42, 0);
    ctx.lineTo(42, 128);
    ctx.moveTo(85, 0);
    ctx.lineTo(85, 128);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 2);
    return tex;
  };

  // 4. Build 3D Procedural Skyline
  const buildSkyline = (group: THREE.Group) => {
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    }
    beaconMaterialsRef.current = [];

    const windowTexture = createSkyscraperTexture();

    const buildingPositions = [
      { x: -18, z: -20, w: 3.8, d: 3.8, h: 16, type: 'stepped' },
      { x: -14, z: -17, w: 3.0, d: 3.0, h: 12, type: 'glass' },
      { x: -10, z: -21, w: 3.4, d: 3.2, h: 18, type: 'antenna' },
      { x: -16, z: -27, w: 4.4, d: 4.4, h: 22, type: 'glass' },
      { x: -6, z: -18, w: 2.8, d: 2.8, h: 11, type: 'standard' },
      { x: -11, z: -30, w: 4.8, d: 4.8, h: 25, type: 'stepped' },

      { x: -3, z: -24, w: 4.0, d: 4.0, h: 20, type: 'glass' },
      { x: 2, z: -27, w: 4.5, d: 4.0, h: 23, type: 'antenna' },
      { x: 0, z: -19, w: 3.0, d: 3.0, h: 14, type: 'stepped' },
      { x: 5, z: -22, w: 3.5, d: 3.2, h: 17, type: 'glass' },

      { x: 8, z: -17, w: 2.9, d: 2.9, h: 11.5, type: 'standard' },
      { x: 12, z: -21, w: 3.6, d: 3.4, h: 19, type: 'antenna' },
      { x: 16, z: -17, w: 3.2, d: 3.2, h: 13, type: 'glass' },
      { x: 14, z: -26, w: 4.2, d: 4.2, h: 21, type: 'stepped' },
      { x: 19, z: -22, w: 3.8, d: 3.8, h: 16.5, type: 'glass' },
      { x: 10, z: -32, w: 5.0, d: 5.0, h: 26, type: 'antenna' },

      { x: -25, z: -36, w: 5.2, d: 5.2, h: 28, type: 'glass' },
      { x: -2, z: -38, w: 6.0, d: 6.0, h: 32, type: 'stepped' },
      { x: 22, z: -37, w: 5.4, d: 5.4, h: 29, type: 'antenna' },
    ];

    buildingPositions.forEach((b) => {
      const bMat = new THREE.MeshStandardMaterial({
        map: windowTexture,
        roughness: 0.28,
        metalness: 0.55,
        color: 0x475569,
      });

      const bMesh = new THREE.Mesh(new THREE.BoxGeometry(b.w, b.h, b.d), bMat);
      bMesh.position.set(b.x, -10 + b.h / 2, b.z);
      group.add(bMesh);

      if (b.type === 'stepped') {
        const tierH = 2.4;
        const tierMesh = new THREE.Mesh(
          new THREE.BoxGeometry(b.w * 0.72, tierH, b.d * 0.72),
          bMat
        );
        tierMesh.position.set(b.x, -10 + b.h + tierH / 2, b.z);
        group.add(tierMesh);

        const crownMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd });
        const crownGlow = new THREE.Mesh(
          new THREE.BoxGeometry(b.w * 0.76, 0.2, b.d * 0.76),
          crownMat
        );
        crownGlow.position.set(b.x, -10 + b.h + tierH, b.z);
        group.add(crownGlow);
      }

      if (b.type === 'antenna' || b.h > 17) {
        const spireH = 3.2;
        const spire = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.12, spireH, 8),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 })
        );
        spire.position.set(b.x, -10 + b.h + spireH / 2, b.z);
        group.add(spire);

        // Pulsing red obstruction light
        const beaconMat = new THREE.MeshBasicMaterial({
          color: 0xef4444,
          transparent: true,
          opacity: 1.0,
        });
        beaconMaterialsRef.current.push(beaconMat);

        const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), beaconMat);
        beacon.position.set(b.x, -10 + b.h + spireH + 0.1, b.z);
        group.add(beacon);
      }
    });
  };

  // 5. Build 3D Sky Clouds
  const buildSkyClouds = (group: THREE.Group) => {
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    }

    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
      roughness: 0.95,
      metalness: 0.05,
    });

    const clusters = [
      { x: -18, y: 10, z: -26, scale: 2.2 },
      { x: -7, y: 14, z: -32, scale: 3.1 },
      { x: 4, y: 11, z: -23, scale: 2.5 },
      { x: 15, y: 13, z: -29, scale: 2.8 },
      { x: 24, y: 9, z: -25, scale: 2.2 },
      { x: -25, y: 15, z: -36, scale: 3.4 },
      { x: 9, y: 16, z: -35, scale: 3.0 },
    ];

    clusters.forEach((c) => {
      const clusterGroup = new THREE.Group();
      clusterGroup.position.set(c.x, c.y, c.z);

      for (let p = 0; p < 5; p++) {
        const puffMesh = new THREE.Mesh(
          new THREE.SphereGeometry((0.65 + Math.random() * 0.35) * c.scale, 12, 12),
          cloudMat
        );
        puffMesh.position.set(
          (p - 2) * 0.75 * c.scale + (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.28 * c.scale,
          (Math.random() - 0.5) * 0.4 * c.scale
        );
        clusterGroup.add(puffMesh);
      }
      group.add(clusterGroup);
    });
  };

  // 6. Build Celestial Sun & Atmospheric Glow
  const buildCelestialAtmosphere = (group: THREE.Group) => {
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    }

    const sunGroup = new THREE.Group();
    sunGroup.position.set(12, 16, -28);

    const sunCore = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    sunGroup.add(sunCore);

    const sunCorona = new THREE.Mesh(
      new THREE.SphereGeometry(3.6, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        transparent: true,
        opacity: 0.42,
      })
    );
    sunGroup.add(sunCorona);

    const outerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(6.4, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
      })
    );
    sunGroup.add(outerGlow);
    group.add(sunGroup);
  };

  // 7. Build Highway Traffic Streaks in the Canyon below
  const buildHighwayTraffic = (group: THREE.Group) => {
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Points) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    }

    const carCount = 140;
    const tGeo = new THREE.BufferGeometry();
    const tPos = new Float32Array(carCount * 3);
    const tColors = new Float32Array(carCount * 3);

    for (let i = 0; i < carCount; i++) {
      const isHeadlight = i < carCount / 2;
      const zOffset = isHeadlight ? -15.5 : -17.5;
      tPos[i * 3] = -25 + (i % (carCount / 2)) * (50 / (carCount / 2)) + (Math.random() - 0.5) * 0.8;
      tPos[i * 3 + 1] = -9.8 + (Math.random() - 0.5) * 0.15;
      tPos[i * 3 + 2] = zOffset + (Math.random() - 0.5) * 0.6;

      if (isHeadlight) {
        tColors[i * 3] = 1.0;
        tColors[i * 3 + 1] = 0.95;
        tColors[i * 3 + 2] = 0.7;
      } else {
        tColors[i * 3] = 0.95;
        tColors[i * 3 + 1] = 0.15;
        tColors[i * 3 + 2] = 0.15;
      }
    }

    tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
    tGeo.setAttribute('color', new THREE.BufferAttribute(tColors, 3));

    const tMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const trafficPoints = new THREE.Points(tGeo, tMat);
    trafficParticlesRef.current = trafficPoints;
    group.add(trafficPoints);
  };

  // 8. Build Rooftop Parapet Stage
  const buildRooftopParapet = (group: THREE.Group) => {
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Group) {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      }
    }

    const pylonMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.22,
    });

    const pylonPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.075, 1.3, 24),
      pylonMat
    );
    pylonPole.position.y = -0.75;
    group.add(pylonPole);

    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.28, 0.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 })
    );
    collar.position.y = -0.65;
    group.add(collar);

    const statusRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.23, 0.02, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    );
    statusRing.rotation.x = Math.PI / 2;
    statusRing.position.y = -0.65;
    group.add(statusRing);

    const baseFlange = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.44, 0.12, 32),
      pylonMat
    );
    baseFlange.position.y = -1.35;
    group.add(baseFlange);

    // Concrete Parapet Lip
    const parapetMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.75,
      metalness: 0.15,
    });

    const parapetLedge = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.45, 1.4), parapetMat);
    parapetLedge.position.set(0, -1.45, -0.2);
    group.add(parapetLedge);

    // Hazard Chevron Striping Decal
    const hazardTex = createHazardTexture();
    const hazardStripe = new THREE.Mesh(
      new THREE.BoxGeometry(10.02, 0.18, 0.02),
      new THREE.MeshBasicMaterial({ map: hazardTex })
    );
    hazardStripe.position.set(0, -1.32, 0.51);
    group.add(hazardStripe);

    const aluminumCap = new THREE.Mesh(
      new THREE.BoxGeometry(10.05, 0.06, 1.45),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.88, roughness: 0.25 })
    );
    aluminumCap.position.set(0, -1.21, -0.2);
    group.add(aluminumCap);

    // Architectural Safety Glass Railing
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.08,
      metalness: 0.1,
      reflectivity: 0.95,
    });

    const glassRailing = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.75, 0.05), glassMat);
    glassRailing.position.set(0, -0.85, 0.45);
    group.add(glassRailing);

    for (let i = -4; i <= 4; i += 2) {
      const stanchion = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.85, 16),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.92, roughness: 0.15 })
      );
      stanchion.position.set(i, -0.85, 0.45);
      group.add(stanchion);
    }

    // Floor Decking
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.8,
      metalness: 0.15,
    });
    const roofDeck = new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.4, 8.0), deckMat);
    roofDeck.position.set(0, -1.65, -4.6);
    group.add(roofDeck);

    // Solar PV Array
    const solarTex = createSolarTexture();
    const solarMat = new THREE.MeshStandardMaterial({
      map: solarTex,
      metalness: 0.82,
      roughness: 0.18,
    });
    const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 1.9), solarMat);
    solarPanel.position.set(3.2, -1.25, -3.5);
    solarPanel.rotation.x = Math.PI * 0.12;
    group.add(solarPanel);

    // Sensor Mast with ANIMATED CUP ANEMOMETER
    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.04, 2.2, 12),
      new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85 })
    );
    mast.position.set(-3.2, -0.4, -1.8);
    group.add(mast);

    const anemometerGroup = new THREE.Group();
    anemometerGroup.position.set(-3.2, 0.72, -1.8);
    anemometerRotorRef.current = anemometerGroup;
    group.add(anemometerGroup);

    for (let c = 0; c < 3; c++) {
      const armAngle = (c * Math.PI * 2) / 3;
      const arm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.22),
        new THREE.MeshStandardMaterial({ color: 0x334155 })
      );
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = armAngle;
      anemometerGroup.add(arm);

      const cup = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8, 0, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5 })
      );
      cup.position.set(Math.cos(armAngle) * 0.12, 0, Math.sin(armAngle) * 0.12);
      cup.rotation.y = armAngle + Math.PI / 2;
      anemometerGroup.add(cup);
    }

    // Industrial HVAC Fan Unit
    const hvacBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.8, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6, roughness: 0.4 })
    );
    hvacBox.position.set(-2.8, -1.25, -4.2);
    group.add(hvacBox);

    const hvacGrill = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.48, 0.05, 24),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 })
    );
    hvacGrill.position.set(-2.8, -0.82, -4.2);
    group.add(hvacGrill);

    const hvacFan = new THREE.Group();
    hvacFan.position.set(-2.8, -0.80, -4.2);
    hvacFanRotorRef.current = hvacFan;
    group.add(hvacFan);

    for (let f = 0; f < 4; f++) {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.015, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x0284c7 })
      );
      blade.rotation.y = (f * Math.PI) / 2;
      hvacFan.add(blade);
    }

    // Sheer Building Facade
    const facadeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.85,
      metalness: 0.1,
    });
    const buildingFacade = new THREE.Mesh(new THREE.BoxGeometry(12.0, 16.0, 0.8), facadeMat);
    buildingFacade.position.set(0, -9.5, 0.65);
    group.add(buildingFacade);
  };

  // Main Scene Setup
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const heightPx = container.clientHeight || 620;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Atmospheric Fog
    scene.fog = new THREE.FogExp2(0xe0f2fe, 0.018);

    const camera = new THREE.PerspectiveCamera(42, width / heightPx, 0.1, 100);
    camera.position.set(0, 0.25, 3.25);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0, 0);
    controls.minDistance = 1.3;
    controls.maxDistance = 6.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.28;
    controlsRef.current = controls;

    renderer.domElement.style.touchAction = 'pan-y';

    // Cinematic Daylight Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.6);
    keyLight.position.set(9, 14, 8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0284c7, 2.6);
    rimLight.position.set(-8, 5, -6);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xbae6fd, 1.2);
    fillLight.position.set(6, -2, -4);
    scene.add(fillLight);

    // Central Rotor Group
    const rotorGroup = new THREE.Group();
    rotorGroup.position.set(0, 0, 0);
    rotorGroupRef.current = rotorGroup;
    scene.add(rotorGroup);

    // Procedural Fallback Rotor
    const proceduralGroup = new THREE.Group();
    proceduralGroup.position.set(0, 0, 0);
    proceduralGroupRef.current = proceduralGroup;
    rotorGroup.add(proceduralGroup);

    const shellMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.75,
      transparent: true,
      opacity: 0.95,
    });
    const mainSphere = new THREE.Mesh(new THREE.SphereGeometry(0.95, 36, 36), shellMat);
    mainSphere.position.set(0, 0, 0);
    mainSphereMeshRef.current = mainSphere;
    proceduralGroup.add(mainSphere);

    // Helical Venturi ducts
    const ventMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x004755,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.8,
    });

    ventGroupsRef.current = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const ventRing = new THREE.Group();
      ventRing.rotation.y = angle;
      ventRing.rotation.x = Math.PI * 0.18 * Math.sin(angle);

      const ventDuct = new THREE.Mesh(
        new THREE.TorusGeometry(0.92, 0.08, 16, 48, Math.PI * 0.75),
        ventMat
      );
      ventDuct.rotation.z = Math.PI * 0.35;
      ventRing.add(ventDuct);

      const scoopMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0x78350f,
        emissiveIntensity: 0.4,
        roughness: 0.3,
      });
      const scoop = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.35, 12), scoopMat);
      scoop.position.set(0.78 * Math.cos(angle), 0.38 * Math.sin(angle * 2), 0.45 * Math.sin(angle));
      scoop.rotation.z = -Math.PI / 4;
      ventRing.add(scoop);

      ventGroupsRef.current.push(ventRing);
      proceduralGroup.add(ventRing);
    }

    const internalCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.42, 1),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x581c87,
        emissiveIntensity: 0.8,
        wireframe: true,
      })
    );
    internalCore.position.set(0, 0, 0);
    internalCoreMeshRef.current = internalCore;
    proceduralGroup.add(internalCore);

    // Solid Titanium Slate CAD Material
    const solidCadMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });
    solidCadMatRef.current = solidCadMat;

    // Holographic X-Ray CAD Material
    const xrayCadMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.24,
      roughness: 0.08,
      metalness: 0.15,
      clearcoat: 1.0,
      transmission: 0.72,
      depthWrite: true,
    });
    xrayCadMatRef.current = xrayCadMat;

    // --- INTERNAL MECHANICS ASSEMBLY (Revealed in X-Ray View) ---
    // 1. Stationary Core Assembly (shaft, bearings, stator copper coils, MPPT PCB)
    const internalMechGroup = new THREE.Group();
    internalMechGroup.name = 'stationary-internal-mechanics';
    internalMechGroup.visible = false;
    internalMechanicsGroupRef.current = internalMechGroup;
    scene.add(internalMechGroup);

    // 2. Rotating Mechanics Assembly (attached to rotorGroup to turn with the turbine!)
    const rotatingMechGroup = new THREE.Group();
    rotatingMechGroup.name = 'rotating-internal-mechanics';
    rotatingMechGroup.visible = false;
    rotatingMagnetsRef.current = rotatingMechGroup;
    rotorGroup.add(rotatingMechGroup);

    // Central Stainless Steel Drive Spindle / Axle
    const shaftGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.85, 32);
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.12,
    });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    internalMechGroup.add(shaft);

    // Dual High-Precision Sealed Ceramic Bearings
    const bearingMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.92, roughness: 0.18 });
    const brassCageMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.25 });

    [0.78, -0.78].forEach((bearingY) => {
      const bRing = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.08, 24), bearingMat);
      bRing.position.y = bearingY;
      internalMechGroup.add(bRing);

      const cage = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.015, 12, 24), brassCageMat);
      cage.rotation.x = Math.PI / 2;
      cage.position.y = bearingY;
      internalMechGroup.add(cage);
    });

    // Stationary 12-Pole Stator Plate & Copper Induction Coils (y = -0.15)
    const statorDiscMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, metalness: 0.4, roughness: 0.4 });
    const statorDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.035, 32), statorDiscMat);
    statorDisc.position.y = -0.15;
    internalMechGroup.add(statorDisc);

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.95,
      roughness: 0.22,
      emissive: 0xb45309,
      emissiveIntensity: 0.4,
    });
    const ironCoreMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 });

    for (let c = 0; c < 12; c++) {
      const angle = (c * Math.PI * 2) / 12;
      const radius = 0.26;
      const coil = new THREE.Mesh(new THREE.TorusGeometry(0.052, 0.02, 16, 24), copperMat);
      coil.position.set(Math.cos(angle) * radius, -0.15, Math.sin(angle) * radius);
      coil.rotation.x = Math.PI / 2;
      internalMechGroup.add(coil);

      const core = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.045, 12), ironCoreMat);
      core.position.set(Math.cos(angle) * radius, -0.15, Math.sin(angle) * radius);
      internalMechGroup.add(core);
    }

    // Synchronous MPPT Circuit Board & Microcontroller (y = -0.34)
    const pcbMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, metalness: 0.3, roughness: 0.4 });
    const pcbBoard = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.015, 32), pcbMat);
    pcbBoard.position.y = -0.34;
    internalMechGroup.add(pcbBoard);

    const smtMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.3 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.92, roughness: 0.2 });

    const inductor = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.045, 0.08), smtMat);
    inductor.position.set(0.12, -0.315, 0.1);
    internalMechGroup.add(inductor);

    const mcu = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.09), smtMat);
    mcu.position.set(-0.1, -0.325, -0.08);
    internalMechGroup.add(mcu);

    const goldBus = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.22, 32), goldMat);
    goldBus.rotation.x = -Math.PI / 2;
    goldBus.position.y = -0.33;
    internalMechGroup.add(goldBus);

    // Active Flashing MPPT Telemetry LED
    const mpptLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 1.0 });
    const mpptLed = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), mpptLedMat);
    mpptLed.position.set(-0.18, -0.32, 0.12);
    mpptLedMeshRef.current = mpptLed;
    internalMechGroup.add(mpptLed);

    // Pulsing Induction Flux Glow Ring around Stator
    const fluxMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const fluxRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.012, 12, 32), fluxMat);
    fluxRing.rotation.x = Math.PI / 2;
    fluxRing.position.y = -0.15;
    fluxRingMeshRef.current = fluxRing;
    internalMechGroup.add(fluxRing);

    // Rotating NdFeB Permanent Magnet Rotor Discs (sandwiching the stator coils)
    const magnetDiscMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.95, roughness: 0.15 });
    const magNMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.85, roughness: 0.25, emissive: 0x991b1b, emissiveIntensity: 0.25 });
    const magSMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.85, roughness: 0.25, emissive: 0x1e40af, emissiveIntensity: 0.25 });

    [-0.07, -0.23].forEach((discY) => {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.022, 32), magnetDiscMat);
      disc.position.y = discY;
      rotatingMechGroup.add(disc);

      for (let m = 0; m < 12; m++) {
        const angle = (m * Math.PI * 2) / 12;
        const magRadius = 0.26;
        const isNorth = m % 2 === 0;
        const mag = new THREE.Mesh(
          new THREE.CylinderGeometry(0.042, 0.042, 0.026, 16),
          isNorth ? magNMat : magSMat
        );
        mag.position.set(Math.cos(angle) * magRadius, discY, Math.sin(angle) * magRadius);
        rotatingMechGroup.add(mag);
      }
    });

    // Internal Bernoulli Venturi Aerodynamic Flow Vanes (6 guide channels)
    const vaneMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    });
    for (let v = 0; v < 6; v++) {
      const vAngle = (v * Math.PI * 2) / 6;
      const vaneGeo = new THREE.CylinderGeometry(0.2, 0.65, 0.42, 12, 1, true, vAngle, Math.PI / 4.5);
      const vane = new THREE.Mesh(vaneGeo, vaneMat);
      vane.position.set(0, v % 2 === 0 ? 0.2 : -0.05, 0);
      vane.rotation.y = vAngle;
      rotatingMechGroup.add(vane);
    }

    // Electrical Power Flow Particles (Downwards through Mast)
    const powerCount = 90;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(powerCount * 3);
    for (let i = 0; i < powerCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 0.035;
      pPos[i * 3 + 1] = -0.15 - Math.random() * 1.25; // between -0.15 and -1.40
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 0.035;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const powerParticlesMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const powerParticles = new THREE.Points(pGeo, powerParticlesMat);
    powerParticles.visible = false;
    powerConduitParticlesRef.current = powerParticles;
    scene.add(powerParticles);

    // Load SolidWorks CAD Model
    const stlLoader = new STLLoader();
    stlLoader.load(
      '/models/OWind_Body.stl',
      (geometry) => {
        geometry.center();
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();

        const box = geometry.boundingBox!;
        const sizeX = box.max.x - box.min.x;
        const sizeY = box.max.y - box.min.y;
        const sizeZ = box.max.z - box.min.z;
        const maxDim = Math.max(sizeX, sizeY, sizeZ);
        const scaleFactor = 1.95 / maxDim;

        const cadMesh = new THREE.Mesh(geometry, solidCadMat);
        cadMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        cadMesh.position.set(0, 0, 0);
        cadMesh.castShadow = true;
        cadMesh.receiveShadow = true;
        cadMeshRef.current = cadMesh;

        rotorGroup.add(cadMesh);
        setCadModelLoaded(true);

        // Blueprint Wireframe Mesh Shell for X-Ray
        const wireframeMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        });
        const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
        wireframeMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        wireframeMesh.position.set(0, 0, 0);
        wireframeMesh.visible = false;
        cadWireframeRef.current = wireframeMesh;
        rotorGroup.add(wireframeMesh);

        proceduralGroup.visible = false;
        cadMesh.visible = true;
      },
      undefined,
      (error) => {
        console.warn('Using procedural CAD fallback:', error);
        proceduralGroup.visible = true;
      }
    );

    // Environmental Groups
    const skylineGroup = new THREE.Group();
    skylineGroupRef.current = skylineGroup;
    scene.add(skylineGroup);
    buildSkyline(skylineGroup);

    const parapetGroup = new THREE.Group();
    parapetGroupRef.current = parapetGroup;
    scene.add(parapetGroup);
    buildRooftopParapet(parapetGroup);

    const celestialGroup = new THREE.Group();
    celestialGroupRef.current = celestialGroup;
    scene.add(celestialGroup);
    buildCelestialAtmosphere(celestialGroup);

    const cloudsGroup = new THREE.Group();
    cloudsGroupRef.current = cloudsGroup;
    scene.add(cloudsGroup);
    buildSkyClouds(cloudsGroup);

    const trafficGroup = new THREE.Group();
    trafficGroupRef.current = trafficGroup;
    scene.add(trafficGroup);
    buildHighwayTraffic(trafficGroup);

    // Dynamic Wind Particles
    const hCount = 200;
    const hGeo = new THREE.BufferGeometry();
    const hPos = new Float32Array(hCount * 3);
    const hVel = new Float32Array(hCount * 3);

    for (let i = 0; i < hCount; i++) {
      const r = 1.4 + Math.random() * 2.5;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 1.2;
      hPos[i * 3] = Math.cos(angle) * r;
      hPos[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      hPos[i * 3 + 2] = Math.sin(angle) * r;

      hVel[i * 3] = -0.018;
      hVel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      hVel[i * 3 + 2] = -0.018;
    }
    hGeo.setAttribute('position', new THREE.BufferAttribute(hPos, 3));

    const hMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
    });
    const windParticles = new THREE.Points(hGeo, hMat);
    windParticlesRef.current = windParticles;
    scene.add(windParticles);

    // Facade Updraft Particles
    const uCount = 130;
    const uGeo = new THREE.BufferGeometry();
    const uPos = new Float32Array(uCount * 3);
    const uVel = new Float32Array(uCount * 3);

    for (let i = 0; i < uCount; i++) {
      uPos[i * 3] = (Math.random() - 0.5) * 3.5;
      uPos[i * 3 + 1] = -5.0 + Math.random() * 4.5;
      uPos[i * 3 + 2] = 0.5 + Math.random() * 0.8;

      uVel[i * 3] = (Math.random() - 0.5) * 0.005;
      uVel[i * 3 + 1] = 0.024 + Math.random() * 0.015;
      uVel[i * 3 + 2] = -0.008;
    }
    uGeo.setAttribute('position', new THREE.BufferAttribute(uPos, 3));

    const uMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
    });
    const updraftParticles = new THREE.Points(uGeo, uMat);
    updraftParticlesRef.current = updraftParticles;
    scene.add(updraftParticles);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Rotor rotation proportional to RPM
      if (rotorGroupRef.current) {
        const radPerSec = (currentRPMRef.current / 60) * 0.85;
        rotorGroupRef.current.rotation.y += radPerSec * delta;
      }

      // Anemometer cups spin with wind speed
      if (anemometerRotorRef.current) {
        anemometerRotorRef.current.rotation.y += activeWindSpeed * 3.4 * delta;
      }

      // HVAC fan
      if (hvacFanRotorRef.current) {
        hvacFanRotorRef.current.rotation.y += 9.5 * delta;
      }

      // Obstruction lights
      const beaconAlpha = Math.sin(elapsedTime * 4.2) > 0.1 ? 1.0 : 0.2;
      beaconMaterialsRef.current.forEach((mat) => {
        mat.opacity = beaconAlpha;
      });

      // Drifting clouds
      if (cloudsGroupRef.current) {
        const cloudDriftSpeed = 0.45 * (activeWindSpeed / 3.42) * delta;
        cloudsGroupRef.current.children.forEach((cluster) => {
          cluster.position.x += cloudDriftSpeed;
          if (cluster.position.x > 32) {
            cluster.position.x = -32;
          }
        });
      }

      // Highway traffic trails
      if (trafficParticlesRef.current) {
        const positions = trafficParticlesRef.current.geometry.attributes.position.array as Float32Array;
        const count = positions.length / 3;
        for (let i = 0; i < count; i++) {
          const isHeadlight = i < count / 2;
          const speed = (isHeadlight ? 0.08 : -0.075) * (1 + (i % 3) * 0.2);
          positions[i * 3] += speed;

          if (isHeadlight && positions[i * 3] > 26) {
            positions[i * 3] = -26;
          } else if (!isHeadlight && positions[i * 3] < -26) {
            positions[i * 3] = 26;
          }
        }
        trafficParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Wind particles
      if (showAirflow) {
        const speedMultiplier = Math.max(0.6, currentRPMRef.current / 110);

        if (windParticlesRef.current) {
          const positions = windParticlesRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < hCount; i++) {
            const idx = i * 3;
            positions[idx] += hVel[idx] * speedMultiplier;
            positions[idx + 1] += hVel[idx + 1] * speedMultiplier;
            positions[idx + 2] += hVel[idx + 2] * speedMultiplier;

            const d = Math.sqrt(positions[idx] * positions[idx] + positions[idx + 2] * positions[idx + 2]);
            if (d < 0.4 || positions[idx] < -3.5 || positions[idx + 2] < -3.5) {
              positions[idx] = 2.2 + Math.random() * 1.5;
              positions[idx + 1] = (Math.random() - 0.5) * 2.0;
              positions[idx + 2] = 2.2 + Math.random() * 1.5;
            }
          }
          windParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        if (updraftParticlesRef.current) {
          const positions = updraftParticlesRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < uCount; i++) {
            const idx = i * 3;
            positions[idx] += uVel[idx] * speedMultiplier;
            positions[idx + 1] += uVel[idx + 1] * speedMultiplier;
            positions[idx + 2] += uVel[idx + 2] * speedMultiplier;

            if (positions[idx + 1] > 1.8 || positions[idx + 2] < -1.5) {
              positions[idx] = (Math.random() - 0.5) * 3.5;
              positions[idx + 1] = -5.0 + Math.random() * 1.2;
              positions[idx + 2] = 0.5 + Math.random() * 0.8;
            }
          }
          updraftParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      // Update X-Ray Mechanics & Live Electrical Flux
      if (internalMechanicsGroupRef.current && internalMechanicsGroupRef.current.visible) {
        // Pulse MPPT status LED
        if (mpptLedMeshRef.current) {
          const ledIntensity = Math.sin(elapsedTime * 6.0) > 0.1 ? 1.0 : 0.25;
          (mpptLedMeshRef.current.material as THREE.MeshBasicMaterial).opacity = ledIntensity;
        }

        // Pulse Electromagnetic Induction Flux Ring
        if (fluxRingMeshRef.current) {
          const powerFactor = Math.min(1.0, currentRPMRef.current / 380);
          const fluxAlpha = 0.35 + Math.sin(elapsedTime * 8.0) * 0.25 * powerFactor;
          (fluxRingMeshRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0.2, fluxAlpha);
        }

        // Stream Power Conduit Particles downwards from generator to battery
        if (powerConduitParticlesRef.current) {
          const positions = powerConduitParticlesRef.current.geometry.attributes.position.array as Float32Array;
          const count = positions.length / 3;
          const streamSpeed = 0.018 * Math.max(0.5, currentRPMRef.current / 90);
          for (let p = 0; p < count; p++) {
            const idx = p * 3;
            positions[idx + 1] -= streamSpeed * (1 + (p % 3) * 0.35);
            if (positions[idx + 1] < -1.35) {
              positions[idx + 1] = -0.15 - Math.random() * 0.08;
              positions[idx] = (Math.random() - 0.5) * 0.04;
              positions[idx + 2] = (Math.random() - 0.5) * 0.04;
            }
          }
          powerConduitParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 620;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Airflow visibility
  useEffect(() => {
    if (windParticlesRef.current && updraftParticlesRef.current) {
      windParticlesRef.current.visible = showAirflow;
      updraftParticlesRef.current.visible = showAirflow;
    }
  }, [showAirflow]);

  // Update Auto-Rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 2.2;
    }
  }, [autoRotate]);

  // Handle X-Ray View Material & Mesh Toggles
  useEffect(() => {
    // 1. Update CAD Mesh Material and Wireframe
    if (cadMeshRef.current && solidCadMatRef.current && xrayCadMatRef.current) {
      cadMeshRef.current.material = isXray ? xrayCadMatRef.current : solidCadMatRef.current;
      if (cadWireframeRef.current) {
        cadWireframeRef.current.visible = isXray && !isExploded;
      }
    }

    // 2. Fallback procedural sphere material
    if (mainSphereMeshRef.current) {
      if (isXray) {
        mainSphereMeshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0x0284c7,
          emissive: 0x0284c7,
          emissiveIntensity: 0.35,
          transparent: true,
          opacity: 0.28,
          roughness: 0.1,
          metalness: 0.2,
          clearcoat: 1.0,
        });
      } else {
        mainSphereMeshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0x1e293b,
          metalness: 0.85,
          roughness: 0.22,
          clearcoat: 0.95,
        });
      }
    }

    // 3. Internal Mechanics & Power Conduit visibility
    if (internalMechanicsGroupRef.current) {
      internalMechanicsGroupRef.current.visible = isXray && !isExploded;
    }
    if (rotatingMagnetsRef.current) {
      rotatingMagnetsRef.current.visible = isXray && !isExploded;
    }
    if (powerConduitParticlesRef.current) {
      powerConduitParticlesRef.current.visible = isXray && !isExploded;
    }
  }, [isXray, isExploded]);

  // Handle Exploded View Toggle
  useEffect(() => {
    if (!mainSphereMeshRef.current || !internalCoreMeshRef.current) return;

    if (isExploded) {
      if (cadMeshRef.current) cadMeshRef.current.visible = false;
      if (cadWireframeRef.current) cadWireframeRef.current.visible = false;
      if (proceduralGroupRef.current) proceduralGroupRef.current.visible = true;

      mainSphereMeshRef.current.scale.set(1.4, 1.4, 1.4);
      internalCoreMeshRef.current.scale.set(1.3, 1.3, 1.3);

      ventGroupsRef.current.forEach((vent, i) => {
        const factor = 0.38;
        vent.position.set(
          Math.cos((i * Math.PI) / 3) * factor,
          i % 2 === 0 ? 0.25 : -0.25,
          Math.sin((i * Math.PI) / 3) * factor
        );
      });
    } else {
      mainSphereMeshRef.current.scale.set(1, 1, 1);
      internalCoreMeshRef.current.scale.set(1, 1, 1);

      ventGroupsRef.current.forEach((vent) => {
        vent.position.set(0, 0, 0);
      });

      if (cadMeshRef.current) {
        cadMeshRef.current.visible = true;
        if (proceduralGroupRef.current) proceduralGroupRef.current.visible = false;
      }
    }
  }, [isExploded]);

  const handleResetCamera = () => {
    soundFx.playClick();
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 0.2, 3.1);
    controlsRef.current.target.set(0, 0, 0);
  };

  // Dynamic electrical generation calculations
  const generatedPower = Number((0.5 * 1.225 * Math.PI * Math.pow(0.48, 2) * 0.38 * Math.pow(activeWindSpeed, 3) * 0.818).toFixed(1));
  const livePower = manualWindOverride !== null ? Math.max(1.2, generatedPower) : (telemetry.power > 0 ? telemetry.power : Math.max(1.2, generatedPower));
  const liveVoltage = 3.70; // 3.7V Synchronous LiFePO4 bus
  const liveCurrent = Number((livePower / liveVoltage).toFixed(2));
  const liveTorque = Number((livePower / Math.max(1, (effectiveRPM * 2 * Math.PI) / 60)).toFixed(2));

  return (
    <div
      style={{ height }}
      className="relative w-full rounded-2xl overflow-hidden border border-cyan-400/30 shadow-[0_20px_50px_rgba(2,132,199,0.16)] group select-none transition-colors duration-500 bg-gradient-to-b from-[#0284c7] via-[#38bdf8]/65 to-[#e0f2fe]"
    >
      {/* Radiant Sun/Sky Aurora Glow Behind Turbine for Cinematic Depth */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-gradient-to-b from-amber-200/30 via-cyan-300/25 to-transparent blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-8 left-0 right-0 h-36 bg-gradient-to-t from-sky-200/50 via-cyan-100/25 to-transparent pointer-events-none" />

      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-0" />

      {/* TOP STATUS PILL & VIEW MODE SWITCHER */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/90 flex items-center gap-2 text-xs font-sans text-stone-800 shadow-md">
            <span className={`w-2.5 h-2.5 rounded-full ${isXray ? 'bg-amber-400 animate-ping' : 'bg-cyan-500 animate-ping'}`} />
            <span className="font-bold tracking-tight">
              {isXray ? 'X-RAY MECHANICS TWIN' : (cadModelLoaded ? 'SOLIDWORKS CAD TWIN' : 'O-WIND ROTOR')}
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-900 font-extrabold">{effectiveRPM} RPM</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-cyan-700 font-bold text-[11px] hidden sm:inline tracking-wide">
              {isXray ? `${livePower.toFixed(1)}W GENERATING` : 'LIVE PARAPET'}
            </span>
          </div>

          {/* Quick Solid CAD vs X-Ray Toggle Pills */}
          <div className="hidden sm:flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full border border-stone-200/90 shadow-sm text-xs font-sans">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setIsXray(false);
                setIsExploded(false);
              }}
              className={`px-2.5 py-1 rounded-full transition text-[11px] font-bold cursor-pointer ${
                !isXray && !isExploded ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Solid CAD
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setIsXray(true);
                setIsExploded(false);
              }}
              className={`px-2.5 py-1 rounded-full transition text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                isXray ? 'bg-cyan-600 text-white shadow-xs' : 'text-cyan-700 hover:bg-cyan-50'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-300" />
              <span>X-Ray Mechanics</span>
            </button>
          </div>
        </div>

        {/* Center / Orbit Hint (Desktop Only) */}
        <div className="hidden lg:block pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-stone-900/60 backdrop-blur-md text-[11px] font-sans font-medium text-white/90 shadow-md border border-white/10">
            360° Drag to Orbit · Scroll to Zoom
          </span>
        </div>
      </div>

      {/* FLOATING X-RAY LIVE GENERATION & MECHANICS HUD CARD */}
      {isXray && (
        <div className="absolute top-14 sm:top-16 right-3 sm:right-4 z-20 pointer-events-auto max-w-[275px] sm:max-w-[315px] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-cyan-400/50 rounded-2xl p-3 sm:p-3.5 text-white shadow-2xl shadow-cyan-950/40 font-sans space-y-2.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-bold tracking-wide">
                <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>FLUX GENERATION HUD</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                81.8% MPPT LOCK
              </span>
            </div>

            {/* Main Power Output Readout */}
            <div className="bg-slate-950/80 rounded-xl p-2.5 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-cyan-400/80 tracking-widest uppercase block font-sans font-bold">RECTIFIED POWER</span>
                <div className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-tight font-display flex items-baseline gap-1">
                  {livePower.toFixed(1)}
                  <span className="text-xs font-sans font-bold text-cyan-400">W</span>
                </div>
              </div>
              <div className="text-right text-[11px] space-y-0.5 text-slate-300 font-sans">
                <div className="font-semibold text-stone-200">{liveVoltage.toFixed(2)} V <span className="text-slate-500 text-[10px]">DC BUS</span></div>
                <div className="text-emerald-400 font-bold">{liveCurrent.toFixed(2)} A <span className="text-slate-500 text-[10px]">CURRENT</span></div>
              </div>
            </div>

            {/* Mechanics Metrics Row */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 font-sans">
                <span className="text-slate-400 text-[9px] block font-medium">AXLE TORQUE</span>
                <span className="text-amber-300 font-bold">{liveTorque.toFixed(2)} N·m</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 font-sans">
                <span className="text-slate-400 text-[9px] block font-medium">ALTERNATOR</span>
                <span className="text-cyan-300 font-bold">12-Pole PMG</span>
              </div>
            </div>

            {/* Interactive Mechanics Hotspot Buttons */}
            <div>
              <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                <span>INSPECT SUBSYSTEM:</span>
                <span className="text-cyan-400 text-[9px]">Tap to isolate</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'generator' ? null : 'generator')}
                  className={`p-1.5 rounded-lg border text-left transition font-semibold cursor-pointer ${
                    selectedHotspot === 'generator'
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ⚡ 12-Pole PMG
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'mppt' ? null : 'mppt')}
                  className={`p-1.5 rounded-lg border text-left transition font-semibold cursor-pointer ${
                    selectedHotspot === 'mppt'
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  🔋 MPPT Board
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'bearings' ? null : 'bearings')}
                  className={`p-1.5 rounded-lg border text-left transition font-semibold cursor-pointer ${
                    selectedHotspot === 'bearings'
                      ? 'bg-purple-500/30 border-purple-400 text-purple-200'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ⚙️ Bearings
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'vanes' ? null : 'vanes')}
                  className={`p-1.5 rounded-lg border text-left transition font-semibold cursor-pointer ${
                    selectedHotspot === 'vanes'
                      ? 'bg-sky-500/30 border-sky-400 text-sky-200'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  🌀 Venturi Vanes
                </button>
              </div>

              {/* Hotspot details tooltip */}
              {selectedHotspot && (
                <div className="mt-2 p-2 rounded-lg bg-cyan-950/90 border border-cyan-500/40 text-[10px] text-cyan-200 font-sans leading-relaxed animate-in fade-in duration-200">
                  {selectedHotspot === 'generator' && (
                    <p><strong>12-Pole Axial PMG:</strong> Dual NdFeB magnet discs sandwich stationary copper coils to produce 3-phase AC with zero cogging torque.</p>
                  )}
                  {selectedHotspot === 'mppt' && (
                    <p><strong>Synchronous MPPT PCB:</strong> Active high-frequency buck-boost converter rectifies variable wind voltage directly into 3.7V LiFePO4 batteries.</p>
                  )}
                  {selectedHotspot === 'bearings' && (
                    <p><strong>Dual Ceramic Bearings:</strong> Sealed ABEC-7 hybrid ceramic races withstand monsoons and urban dust for 15+ years maintenance-free.</p>
                  )}
                  {selectedHotspot === 'vanes' && (
                    <p><strong>Bernoulli Cross-Ducts:</strong> 6 internal spiral flow channels channel omnidirectional winds into single-axis shaft rotation.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM FLOATING CONTROLS: Ultra-Clean, Single Responsive Glassmorphic Dock */}
      {showControls && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-auto max-w-[calc(100%-16px)] sm:max-w-none">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-2xl p-1.5 sm:p-2 rounded-full border border-stone-200/90 shadow-xl shadow-stone-900/10 text-xs font-sans">
            {/* 1. Wind Speed Interactive Slider */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-full bg-stone-100/80 border border-stone-200/60">
              <Wind className="w-3.5 h-3.5 text-cyan-600 animate-pulse shrink-0" />
              <input
                type="range"
                min="1.0"
                max="8.5"
                step="0.2"
                value={activeWindSpeed}
                onChange={(e) => setManualWindOverride(parseFloat(e.target.value))}
                className="w-14 sm:w-20 accent-stone-900 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                title="Adjust Wind Velocity"
              />
              <span className="font-extrabold text-stone-900 text-[11px] sm:text-xs min-w-[2.8rem] text-right">
                {activeWindSpeed.toFixed(1)}m/s
              </span>
            </div>

            {/* 2. Auto Orbit 360° Showroom */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setAutoRotate(!autoRotate);
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full transition font-semibold text-[11px] sm:text-xs cursor-pointer ${
                autoRotate
                  ? 'bg-purple-100 text-purple-800 font-bold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
              title="Toggle 360° Auto-Orbit"
            >
              {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Orbit</span>
            </button>

            {/* 3. Streamlines Toggle */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setShowAirflow(!showAirflow);
              }}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-full transition text-[11px] sm:text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                showAirflow
                  ? 'bg-cyan-100 text-cyan-800 font-bold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-500'
              }`}
              title="Toggle Wind Streamlines & Updrafts"
            >
              <Wind className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Airflow</span>
            </button>

            {/* 4. X-Ray View Mode Toggle */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setIsXray(!isXray);
                if (isExploded) setIsExploded(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition text-[11px] sm:text-xs font-bold cursor-pointer ${
                isXray
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-2 ring-cyan-300'
                  : 'bg-stone-900 hover:bg-black text-white shadow-sm'
              }`}
              title="Toggle Internal Mechanics & Live Electrical Generation X-Ray"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{isXray ? 'Solid CAD' : 'X-Ray View'}</span>
            </button>

            {/* 5. Exploded View Toggle */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setIsExploded(!isExploded);
                if (isXray) setIsXray(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full transition text-[11px] sm:text-xs font-bold cursor-pointer ${
                isExploded
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
              title="Inspect Exploded Assembly"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isExploded ? 'Collapsed' : 'Explode'}</span>
            </button>

            {/* 6. Reset Camera Center */}
            <button
              type="button"
              onClick={handleResetCamera}
              className="p-1.5 sm:p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
              title="Reset View to Dead-Center"
              aria-label="Reset Camera"
            >
              <Rotate3d className="w-3.5 h-3.5 text-stone-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
