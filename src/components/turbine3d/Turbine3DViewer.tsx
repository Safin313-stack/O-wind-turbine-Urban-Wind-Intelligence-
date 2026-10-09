import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useTelemetry } from '../../context/TelemetryContext';
import { soundFx } from '../../utils/audio';
import { 
  Rotate3d, 
  ZoomIn, 
  ZoomOut, 
  Wind, 
  Layers, 
  Sparkles,
  Box,
  CheckCircle2,
  Building2,
  Sun,
  Sunset,
  Moon,
  Compass,
  Play,
  Pause,
  Eye,
  Maximize2
} from 'lucide-react';

interface Turbine3DViewerProps {
  height?: string;
  showControls?: boolean;
}

export type MaterialTheme = 'stealth' | 'titanium' | 'pearl' | 'cfd' | 'wireframe';
export type EnvironmentType = 'rooftop' | 'tunnel' | 'studio';
export type TimeOfDay = 'day' | 'sunset' | 'night';

export const Turbine3DViewer: React.FC<Turbine3DViewerProps> = ({
  height = '580px',
  showControls = true,
}) => {
  const { telemetry } = useTelemetry();
  const containerRef = useRef<HTMLDivElement>(null);

  // User Interactive State
  const [materialTheme, setMaterialTheme] = useState<MaterialTheme>('stealth');
  const [environment, setEnvironment] = useState<EnvironmentType>('rooftop');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [showAirflow, setShowAirflow] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [manualWindOverride, setManualWindOverride] = useState<number | null>(null);
  const [windAzimuth, setWindAzimuth] = useState<number>(45); // Wind incoming angle in degrees
  const [cadModelLoaded, setCadModelLoaded] = useState<boolean>(false);
  const [isExploded, setIsExploded] = useState<boolean>(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rotorGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);
  const currentRPMRef = useRef<number>(telemetry.rpm);

  // Environmental groups
  const environmentGroupRef = useRef<THREE.Group | null>(null);
  const skylineGroupRef = useRef<THREE.Group | null>(null);
  const parapetGroupRef = useRef<THREE.Group | null>(null);
  const windParticlesRef = useRef<THREE.Points | null>(null);
  const updraftParticlesRef = useRef<THREE.Points | null>(null);
  const studioGridRef = useRef<THREE.GridHelper | null>(null);

  // Lighting references for time of day transitions
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  // Mesh references
  const cadMeshRef = useRef<THREE.Mesh | null>(null);
  const proceduralGroupRef = useRef<THREE.Group | null>(null);
  const mainSphereMeshRef = useRef<THREE.Mesh | null>(null);
  const internalCoreMeshRef = useRef<THREE.Mesh | null>(null);
  const ventGroupsRef = useRef<THREE.Group[]>([]);

  // Active wind velocity calculations
  const activeWindSpeed = manualWindOverride ?? telemetry.windSpeed;
  const effectiveRPM = manualWindOverride ? Math.round(manualWindOverride * 53.5) : telemetry.rpm;

  useEffect(() => {
    currentRPMRef.current = effectiveRPM;
  }, [effectiveRPM]);

  // Helper: Procedural Skyscraper Window Matrix Texture
  const createSkyscraperTexture = (tod: TimeOfDay): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Facade background tone
    if (tod === 'night') {
      ctx.fillStyle = '#090d1a';
    } else if (tod === 'sunset') {
      ctx.fillStyle = '#261b2e';
    } else {
      ctx.fillStyle = '#334155';
    }
    ctx.fillRect(0, 0, 128, 256);

    // Architectural Window Matrix
    const rows = 16;
    const cols = 8;
    const w = 9;
    const h = 11;
    const padX = 7;
    const padY = 5;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isLit = Math.random() > (tod === 'night' ? 0.35 : 0.7);
        if (isLit) {
          if (tod === 'night') {
            ctx.fillStyle = Math.random() > 0.4 ? '#fef08a' : '#38bdf8';
          } else if (tod === 'sunset') {
            ctx.fillStyle = Math.random() > 0.3 ? '#fed7aa' : '#fbbf24';
          } else {
            ctx.fillStyle = '#94a3b8';
          }
        } else {
          ctx.fillStyle = tod === 'night' ? '#172554' : '#1e293b';
        }
        ctx.fillRect(c * (w + padX) + 6, r * (h + padY) + 6, w, h);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 4);
    return tex;
  };

  // Helper: Build the 3D Procedural Skyline (Dhaka High-Rise Metropolis)
  const buildSkyline = (group: THREE.Group, tod: TimeOfDay) => {
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    }

    const windowTexture = createSkyscraperTexture(tod);

    // 22 Procedural Skyscraper Towers across the background horizon
    const buildingPositions = [
      // Left cluster (Gulshan / Banani commercial skyline)
      { x: -16, z: -18, w: 3.5, d: 3.5, h: 14 },
      { x: -12, z: -15, w: 2.8, d: 2.8, h: 11 },
      { x: -8, z: -19, w: 3.2, d: 3.0, h: 16 },
      { x: -14, z: -25, w: 4.0, d: 4.0, h: 20 },
      { x: -5, z: -16, w: 2.5, d: 2.5, h: 9.5 },
      { x: -9, z: -28, w: 4.5, d: 4.5, h: 22 },

      // Center distant towers (Motijheel Central Business District)
      { x: -2, z: -22, w: 3.6, d: 3.6, h: 18 },
      { x: 2, z: -25, w: 4.2, d: 3.8, h: 21 },
      { x: 0, z: -18, w: 2.8, d: 2.8, h: 13 },
      { x: 4, z: -20, w: 3.2, d: 3.0, h: 15 },

      // Right cluster (Modern high-rise towers)
      { x: 7, z: -16, w: 2.6, d: 2.6, h: 10 },
      { x: 10, z: -19, w: 3.4, d: 3.2, h: 17 },
      { x: 14, z: -15, w: 2.9, d: 2.9, h: 12 },
      { x: 12, z: -24, w: 3.8, d: 3.8, h: 19 },
      { x: 17, z: -20, w: 3.5, d: 3.5, h: 15 },
      { x: 9, z: -29, w: 4.5, d: 4.5, h: 24 },
    ];

    buildingPositions.forEach((b) => {
      const bMat = new THREE.MeshStandardMaterial({
        map: windowTexture,
        roughness: 0.35,
        metalness: 0.45,
        color: tod === 'night' ? 0x111827 : (tod === 'sunset' ? 0x431407 : 0x64748b),
      });

      const bMesh = new THREE.Mesh(
        new THREE.BoxGeometry(b.w, b.h, b.d),
        bMat
      );
      // Place building bottom on ground level (y = -10), top extends upward
      bMesh.position.set(b.x, -10 + b.h / 2, b.z);
      group.add(bMesh);

      // Rooftop communications antenna / warning beacon on tall buildings
      if (b.h > 14) {
        const spire = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.08, 2.5, 8),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
        );
        spire.position.set(b.x, -10 + b.h + 1.25, b.z);
        group.add(spire);

        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 8, 8),
          new THREE.MeshBasicMaterial({ color: tod === 'night' ? 0xef4444 : 0xf59e0b })
        );
        beacon.position.set(b.x, -10 + b.h + 2.5, b.z);
        group.add(beacon);
      }
    });
  };

  // Helper: Build the Rooftop Parapet Stage beneath the turbine
  const buildRooftopParapet = (group: THREE.Group, tod: TimeOfDay) => {
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    }

    // 1. Turbine Heavy-Duty Aerodynamic Pylon Stand (Connects (0,0,0) turbine to parapet)
    const pylonMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
    });

    // Vertical mounting pole
    const pylonPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.075, 1.3, 24),
      pylonMat
    );
    pylonPole.position.y = -0.75;
    group.add(pylonPole);

    // Vibration-damping mounting collar
    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.28, 0.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 })
    );
    collar.position.y = -0.65;
    group.add(collar);

    // Status LED ring around mounting collar
    const statusRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.23, 0.02, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    );
    statusRing.rotation.x = Math.PI / 2;
    statusRing.position.y = -0.65;
    group.add(statusRing);

    // Mounting Base Flange with hex bolts
    const baseFlange = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.44, 0.12, 32),
      pylonMat
    );
    baseFlange.position.y = -1.35;
    group.add(baseFlange);

    // 2. Concrete Building Parapet Lip (The 40th Floor Edge where wind accelerates +1.4x)
    const parapetMat = new THREE.MeshStandardMaterial({
      color: tod === 'night' ? 0x1e293b : 0xe2e8f0,
      roughness: 0.8,
      metalness: 0.15,
    });

    const parapetLedge = new THREE.Mesh(
      new THREE.BoxGeometry(10.0, 0.45, 1.4),
      parapetMat
    );
    parapetLedge.position.set(0, -1.45, -0.2);
    group.add(parapetLedge);

    // Brushed Aluminum Cap on Parapet Top Edge
    const aluminumCap = new THREE.Mesh(
      new THREE.BoxGeometry(10.05, 0.06, 1.45),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.3 })
    );
    aluminumCap.position.set(0, -1.21, -0.2);
    group.add(aluminumCap);

    // 3. Safety Architectural Glass Railing along the Parapet
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      reflectivity: 0.9,
    });

    const glassRailing = new THREE.Mesh(
      new THREE.BoxGeometry(9.6, 0.75, 0.05),
      glassMat
    );
    glassRailing.position.set(0, -0.85, 0.45);
    group.add(glassRailing);

    // Steel vertical railing stanchions
    for (let i = -4; i <= 4; i += 2) {
      const stanchion = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.85, 16),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 })
      );
      stanchion.position.set(i, -0.85, 0.45);
      group.add(stanchion);
    }

    // 4. Rooftop Floor Decking (Extending backwards into the building interior)
    const deckMat = new THREE.MeshStandardMaterial({
      color: tod === 'night' ? 0x0f172a : 0xcbd5e1,
      roughness: 0.7,
      metalness: 0.2,
    });

    const roofDeck = new THREE.Mesh(
      new THREE.BoxGeometry(14.0, 0.4, 8.0),
      deckMat
    );
    roofDeck.position.set(0, -1.65, -4.6);
    group.add(roofDeck);

    // 5. Rooftop Equipment Details: Angled Solar PV Array & Edge Telemetry Mast
    const solarMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.7,
      roughness: 0.2,
    });

    // Solar panels behind the turbine
    const solarPanel = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 0.08, 1.8),
      solarMat
    );
    solarPanel.position.set(3.2, -1.25, -3.5);
    solarPanel.rotation.x = Math.PI * 0.12; // 22 degree tilt
    group.add(solarPanel);

    // Edge-CFD Sensor Mast with anemometer
    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.04, 2.2, 12),
      new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 })
    );
    mast.position.set(-3.2, -0.4, -1.8);
    group.add(mast);

    const mastSensor = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    mastSensor.position.set(-3.2, 0.7, -1.8);
    group.add(mastSensor);

    // 6. Sheer Vertical Building Facade dropping into the street canyon
    const facadeMat = new THREE.MeshStandardMaterial({
      color: tod === 'night' ? 0x090d16 : 0x94a3b8,
      roughness: 0.85,
      metalness: 0.1,
    });

    const buildingFacade = new THREE.Mesh(
      new THREE.BoxGeometry(12.0, 16.0, 0.8),
      facadeMat
    );
    buildingFacade.position.set(0, -9.5, 0.65);
    group.add(buildingFacade);
  };

  // Helper: Apply Lighting & Fog for Selected Time of Day
  const updateAtmosphere = useCallback((tod: TimeOfDay, scene: THREE.Scene) => {
    if (!ambientLightRef.current || !keyLightRef.current || !rimLightRef.current || !fillLightRef.current) return;

    if (tod === 'day') {
      scene.fog = new THREE.FogExp2(0xf1f5f9, 0.022);
      ambientLightRef.current.color.setHex(0xffffff);
      ambientLightRef.current.intensity = 1.6;

      keyLightRef.current.color.setHex(0xffffff);
      keyLightRef.current.position.set(6, 9, 6);
      keyLightRef.current.intensity = 3.2;

      rimLightRef.current.color.setHex(0x0284c7); // Crisp cyan rim
      rimLightRef.current.position.set(-6, 3, -5);
      rimLightRef.current.intensity = 2.8;

      fillLightRef.current.color.setHex(0xbae6fd);
      fillLightRef.current.position.set(5, -2, -3);
      fillLightRef.current.intensity = 1.0;
    } else if (tod === 'sunset') {
      scene.fog = new THREE.FogExp2(0x381b28, 0.025);
      ambientLightRef.current.color.setHex(0xfb923c);
      ambientLightRef.current.intensity = 1.2;

      keyLightRef.current.color.setHex(0xf97316); // Golden sunset sun
      keyLightRef.current.position.set(7, 4, 5);
      keyLightRef.current.intensity = 3.6;

      rimLightRef.current.color.setHex(0xfbbf24);
      rimLightRef.current.position.set(-6, 2, -5);
      rimLightRef.current.intensity = 3.0;

      fillLightRef.current.color.setHex(0xa855f7);
      fillLightRef.current.position.set(3, -2, -3);
      fillLightRef.current.intensity = 1.2;
    } else {
      // Night / Cyberpunk
      scene.fog = new THREE.FogExp2(0x020617, 0.028);
      ambientLightRef.current.color.setHex(0x1e293b);
      ambientLightRef.current.intensity = 0.9;

      keyLightRef.current.color.setHex(0x38bdf8); // Moonlight
      keyLightRef.current.position.set(5, 7, 5);
      keyLightRef.current.intensity = 2.2;

      rimLightRef.current.color.setHex(0x00e5ff); // Neon cyan rim
      rimLightRef.current.position.set(-5, 2, -4);
      rimLightRef.current.intensity = 3.8;

      fillLightRef.current.color.setHex(0x6366f1);
      fillLightRef.current.position.set(4, -3, -2);
      fillLightRef.current.intensity = 1.4;
    }
  }, []);

  // Update Turbine Materials dynamically
  const applyTurbineMaterial = useCallback((theme: MaterialTheme) => {
    // 1. SolidWorks CAD Mesh
    if (cadMeshRef.current) {
      if (theme === 'stealth') {
        // High-Contrast Aerospace Titanium & Slate (Razor sharp contrast against any sky!)
        cadMeshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0x1e293b,
          metalness: 0.85,
          roughness: 0.22,
          clearcoat: 0.95,
          clearcoatRoughness: 0.08,
          reflectivity: 0.95,
          wireframe: false,
        });
      } else if (theme === 'titanium') {
        // Anodized Silver Titanium
        cadMeshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0x94a3b8,
          metalness: 0.92,
          roughness: 0.18,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          reflectivity: 0.9,
          wireframe: false,
        });
      } else if (theme === 'pearl') {
        // Studio Pearl White with defined shadows
        cadMeshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0xf8fafc,
          metalness: 0.18,
          roughness: 0.25,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          reflectivity: 0.85,
          wireframe: false,
        });
      } else if (theme === 'cfd') {
        // Aerodynamic Pressure Differential Simulation (Bernoulli Venturi Flow)
        cadMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: 0x0284c7,
          emissive: 0x0369a1,
          emissiveIntensity: 0.35,
          roughness: 0.3,
          metalness: 0.7,
          wireframe: false,
        });
      } else if (theme === 'wireframe') {
        // Full Holographic Engineering CAD Wireframe (17,503 Polygons)
        cadMeshRef.current.material = new THREE.MeshBasicMaterial({
          color: 0x00e5ff,
          wireframe: true,
        });
      }
    }

    // 2. Procedural Fallback Mesh
    if (mainSphereMeshRef.current) {
      if (theme === 'wireframe') {
        mainSphereMeshRef.current.material = new THREE.MeshBasicMaterial({
          color: 0x00e5ff,
          wireframe: true,
        });
      } else if (theme === 'stealth') {
        mainSphereMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.25,
          metalness: 0.75,
        });
      } else {
        mainSphereMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: theme === 'pearl' ? 0xf8fafc : 0x0284c7,
          roughness: 0.3,
          metalness: 0.6,
        });
      }
    }
  }, []);

  // Main Scene Initialization
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const heightPx = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Perspective Camera (Targeting dead-center (0, 0, 0))
    const camera = new THREE.PerspectiveCamera(42, width / heightPx, 0.1, 100);
    camera.position.set(0, 0.25, 3.25);
    cameraRef.current = camera;

    // 3. WebGL Renderer
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
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. OrbitControls for smooth, natural 360° rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0, 0); // ROTATE RIGHT AROUND DEAD-CENTER TURBINE!
    controls.minDistance = 1.3;
    controls.maxDistance = 6.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.28; // Keep camera above building horizon
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 9, 6);
    keyLight.castShadow = true;
    keyLightRef.current = keyLight;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0284c7, 2.8);
    rimLight.position.set(-6, 3, -5);
    rimLightRef.current = rimLight;
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xbae6fd, 1.0);
    fillLight.position.set(5, -2, -3);
    fillLightRef.current = fillLight;
    scene.add(fillLight);

    updateAtmosphere(timeOfDay, scene);

    // 6. Central Rotor Group (Positioned at dead-center (0, 0, 0)!)
    const rotorGroup = new THREE.Group();
    rotorGroup.position.set(0, 0, 0);
    rotorGroupRef.current = rotorGroup;
    scene.add(rotorGroup);

    // 7. Procedural CAD Model Fallback (Also centered at (0, 0, 0))
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

    // Helical Venturi cross ducts
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

    // 8. LOAD ACTUAL SOLIDWORKS CAD STL MODEL (/models/OWind_Body.stl)
    const stlLoader = new STLLoader();
    stlLoader.load(
      '/models/OWind_Body.stl',
      (geometry) => {
        geometry.center(); // Center geometry vertices at (0, 0, 0)
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();

        const box = geometry.boundingBox!;
        const sizeX = box.max.x - box.min.x;
        const sizeY = box.max.y - box.min.y;
        const sizeZ = box.max.z - box.min.z;
        const maxDim = Math.max(sizeX, sizeY, sizeZ);
        const scaleFactor = 1.95 / maxDim; // Substantial, beautifully centered presence!

        const cadMat = new THREE.MeshPhysicalMaterial({
          color: 0x1e293b, // Default high-contrast titanium slate
          metalness: 0.85,
          roughness: 0.22,
          clearcoat: 0.95,
          clearcoatRoughness: 0.08,
          reflectivity: 0.95,
        });

        const cadMesh = new THREE.Mesh(geometry, cadMat);
        cadMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        cadMesh.position.set(0, 0, 0); // DEAD-CENTER IN SCENE!
        cadMesh.castShadow = true;
        cadMesh.receiveShadow = true;
        cadMeshRef.current = cadMesh;

        rotorGroup.add(cadMesh);
        setCadModelLoaded(true);

        proceduralGroup.visible = false;
        cadMesh.visible = true;
      },
      undefined,
      (error) => {
        console.warn('Could not load /models/OWind_Body.stl, using procedural CAD fallback:', error);
        proceduralGroup.visible = true;
      }
    );

    // 9. Environment Groups (Rooftop Parapet & City Skyline)
    const envGroup = new THREE.Group();
    environmentGroupRef.current = envGroup;
    scene.add(envGroup);

    const parapetGroup = new THREE.Group();
    parapetGroupRef.current = parapetGroup;
    envGroup.add(parapetGroup);
    buildRooftopParapet(parapetGroup, timeOfDay);

    const skylineGroup = new THREE.Group();
    skylineGroupRef.current = skylineGroup;
    envGroup.add(skylineGroup);
    buildSkyline(skylineGroup, timeOfDay);

    // Minimal Studio Grid Helper
    const grid = new THREE.GridHelper(8, 32, 0x0284c7, 0xcbd5e1);
    grid.position.y = -1.25;
    grid.visible = false;
    studioGridRef.current = grid;
    scene.add(grid);

    // 10. Live Dynamic Wind Vector Simulation
    // A) Horizontal Canyon Wind Streamlines
    const hCount = 220;
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

    // B) Vertical Building Facade Updrafts (Rising up the building facade into the turbine!)
    const uCount = 140;
    const uGeo = new THREE.BufferGeometry();
    const uPos = new Float32Array(uCount * 3);
    const uVel = new Float32Array(uCount * 3);

    for (let i = 0; i < uCount; i++) {
      uPos[i * 3] = (Math.random() - 0.5) * 3.5;
      uPos[i * 3 + 1] = -5.0 + Math.random() * 4.5; // Updraft rising from street canyon
      uPos[i * 3 + 2] = 0.5 + Math.random() * 0.8;

      uVel[i * 3] = (Math.random() - 0.5) * 0.005;
      uVel[i * 3 + 1] = 0.024 + Math.random() * 0.015; // Strong vertical rush!
      uVel[i * 3 + 2] = -0.008; // Curves over parapet lip into turbine
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

    // 11. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth OrbitControls update
      controls.update();

      // Dynamic Turbine Rotation proportional to Live RPM
      if (rotorGroupRef.current) {
        const radPerSec = (currentRPMRef.current / 60) * 0.85;
        rotorGroupRef.current.rotation.y += radPerSec * delta;
      }

      // Wind Particle Flow Simulation
      if (showAirflow) {
        const speedMultiplier = Math.max(0.6, currentRPMRef.current / 110);

        // Horizontal canyon stream
        if (windParticlesRef.current) {
          const positions = windParticlesRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < hCount; i++) {
            const idx = i * 3;
            positions[idx] += hVel[idx] * speedMultiplier;
            positions[idx + 1] += hVel[idx + 1] * speedMultiplier;
            positions[idx + 2] += hVel[idx + 2] * speedMultiplier;

            // Reset when passed or too far
            const d = Math.sqrt(positions[idx] * positions[idx] + positions[idx + 2] * positions[idx + 2]);
            if (d < 0.4 || positions[idx] < -3.5 || positions[idx + 2] < -3.5) {
              positions[idx] = 2.2 + Math.random() * 1.5;
              positions[idx + 1] = (Math.random() - 0.5) * 2.0;
              positions[idx + 2] = 2.2 + Math.random() * 1.5;
            }
          }
          windParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Vertical facade updraft
        if (updraftParticlesRef.current) {
          const positions = updraftParticlesRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < uCount; i++) {
            const idx = i * 3;
            positions[idx] += uVel[idx] * speedMultiplier;
            positions[idx + 1] += uVel[idx + 1] * speedMultiplier;
            positions[idx + 2] += uVel[idx + 2] * speedMultiplier;

            // Reset when looped past turbine
            if (positions[idx + 1] > 1.8 || positions[idx + 2] < -1.5) {
              positions[idx] = (Math.random() - 0.5) * 3.5;
              positions[idx + 1] = -5.0 + Math.random() * 1.2;
              positions[idx + 2] = 0.5 + Math.random() * 0.8;
            }
          }
          updraftParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 560;
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

  // Update Atmosphere and Environment
  useEffect(() => {
    if (!sceneRef.current) return;
    updateAtmosphere(timeOfDay, sceneRef.current);

    if (skylineGroupRef.current) {
      buildSkyline(skylineGroupRef.current, timeOfDay);
    }
    if (parapetGroupRef.current) {
      buildRooftopParapet(parapetGroupRef.current, timeOfDay);
    }
  }, [timeOfDay, updateAtmosphere]);

  // Update Environment View Mode (Rooftop vs Tunnel vs Studio)
  useEffect(() => {
    if (environmentGroupRef.current && studioGridRef.current) {
      if (environment === 'rooftop') {
        environmentGroupRef.current.visible = true;
        studioGridRef.current.visible = false;
        if (skylineGroupRef.current) skylineGroupRef.current.visible = true;
        if (parapetGroupRef.current) parapetGroupRef.current.visible = true;
      } else if (environment === 'tunnel') {
        environmentGroupRef.current.visible = true;
        if (skylineGroupRef.current) skylineGroupRef.current.visible = false;
        if (parapetGroupRef.current) parapetGroupRef.current.visible = true;
        studioGridRef.current.visible = true;
      } else {
        // Minimal Studio
        environmentGroupRef.current.visible = false;
        studioGridRef.current.visible = true;
      }
    }
  }, [environment]);

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
      controlsRef.current.autoRotateSpeed = 2.4;
    }
  }, [autoRotate]);

  // Update Material Shading
  useEffect(() => {
    applyTurbineMaterial(materialTheme);
  }, [materialTheme, applyTurbineMaterial]);

  // Handle Exploded View Toggle
  useEffect(() => {
    if (!mainSphereMeshRef.current || !internalCoreMeshRef.current) return;

    if (isExploded) {
      if (cadMeshRef.current) cadMeshRef.current.visible = false;
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

  // Camera Focus Position Presets
  const setCameraPreset = (preset: 'center' | 'edge' | 'skyline') => {
    soundFx.playClick();
    if (!cameraRef.current || !controlsRef.current) return;

    if (preset === 'center') {
      // Focus Right on Turbine Center
      cameraRef.current.position.set(0, 0.2, 3.1);
      controlsRef.current.target.set(0, 0, 0);
    } else if (preset === 'edge') {
      // Look Down at Facade Updrafts & Parapet Lip
      cameraRef.current.position.set(1.6, 1.4, 2.4);
      controlsRef.current.target.set(0, -0.3, 0);
    } else if (preset === 'skyline') {
      // Wide Angle Panorama with Skyline in Background
      cameraRef.current.position.set(-2.4, 0.4, 2.0);
      controlsRef.current.target.set(0, 0, 0);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    soundFx.playClick();
    if (!cameraRef.current || !controlsRef.current) return;
    const factor = direction === 'in' ? -0.4 : 0.4;
    cameraRef.current.position.z = Math.max(1.3, Math.min(6.5, cameraRef.current.position.z + factor));
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-stone-200/90 shadow-[0_12px_40px_rgb(0,0,0,0.06)] group select-none transition-colors duration-500 ${
        timeOfDay === 'night'
          ? 'bg-gradient-to-b from-[#090d1a] via-[#040711] to-[#02050c]'
          : timeOfDay === 'sunset'
          ? 'bg-gradient-to-b from-[#381b28] via-[#241320] to-[#140b15]'
          : 'bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]'
      }`}
      style={{ height }}
    >
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* TOP BAR: Real-Time CAD Meta Badge (Left) & Wind Controls (Right) */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2.5 z-10 pointer-events-none">
        {/* Left Status Pill */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200 flex items-center gap-2 text-xs font-mono text-stone-800 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
            <span className="font-bold tracking-tight">
              {cadModelLoaded ? 'SOLIDWORKS CAD MESH' : 'O-WIND 3D ROTOR'}
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-900 font-extrabold">{effectiveRPM} RPM</span>
            <span className="text-stone-300">|</span>
            <span className="text-cyan-700 font-semibold uppercase text-[11px]">{environment}</span>
          </div>

          {cadModelLoaded && (
            <div className="hidden sm:flex bg-emerald-50/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-300 text-[10px] font-mono text-emerald-800 items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>17,503 POLYS · CENTERED</span>
            </div>
          )}
        </div>

        {/* Right Wind Simulation Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200 font-mono text-xs text-stone-700 flex items-center gap-2.5 shadow-md">
            <Wind className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
            <span className="text-[11px] text-stone-500 font-medium">Speed:</span>
            <input
              type="range"
              min="1.0"
              max="8.5"
              step="0.2"
              value={activeWindSpeed}
              onChange={(e) => setManualWindOverride(parseFloat(e.target.value))}
              className="w-16 sm:w-20 accent-stone-900 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
              title="Drag to change urban wind speed"
            />
            <strong className="text-stone-900 text-xs w-11 text-right font-extrabold">
              {activeWindSpeed.toFixed(1)} m/s
            </strong>
            {manualWindOverride !== null && (
              <button
                onClick={() => setManualWindOverride(null)}
                className="text-[10px] text-stone-600 hover:text-stone-950 px-2 py-0.5 rounded-full bg-stone-100 hover:bg-stone-200 transition font-semibold"
                title="Reset to live stream"
              >
                Auto
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CENTER HINT OVERLAY (Fades out when hovered) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="px-3 py-1 rounded-full bg-stone-900/60 backdrop-blur-md text-[11px] font-mono text-white/90 shadow-lg">
          360° Drag to Orbit · Scroll to Zoom
        </span>
      </div>

      {/* BOTTOM FLOATING CONTROL DOCKS (Left & Right) */}
      {showControls && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2.5 z-10 pointer-events-auto">
          {/* Left Dock: Turbine Material & Shading Switcher */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-stone-200 shadow-lg">
            <span className="text-[10px] font-mono uppercase text-stone-400 px-2 font-bold hidden sm:inline">
              Material:
            </span>
            <button
              onClick={() => {
                soundFx.playClick();
                setMaterialTheme('stealth');
              }}
              className={`px-3 py-1 text-xs rounded-full font-mono transition-all ${
                materialTheme === 'stealth'
                  ? 'bg-stone-900 text-white shadow-sm font-bold'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
              title="Aerospace Titanium & Slate (High contrast)"
            >
              Titanium
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMaterialTheme('cfd');
              }}
              className={`px-3 py-1 text-xs rounded-full font-mono transition-all ${
                materialTheme === 'cfd'
                  ? 'bg-cyan-600 text-white shadow-sm font-bold'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
              title="Aerodynamic Bernoulli Pressure Heatmap"
            >
              CFD Aero
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMaterialTheme('pearl');
              }}
              className={`px-3 py-1 text-xs rounded-full font-mono transition-all ${
                materialTheme === 'pearl'
                  ? 'bg-stone-900 text-white shadow-sm font-bold'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
              title="Lustrous Pearl White"
            >
              Pearl
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMaterialTheme('wireframe');
              }}
              className={`px-3 py-1 text-xs rounded-full font-mono transition-all ${
                materialTheme === 'wireframe'
                  ? 'bg-cyan-700 text-white shadow-sm font-bold'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
              title="Holographic Wireframe CAD (17,503 Polygons)"
            >
              Wireframe
            </button>
          </div>

          {/* Right Dock: Environment, Time of Day & Camera Presets */}
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-stone-200 shadow-lg">
            {/* Environment Toggle: Rooftop / Tunnel / Studio */}
            <button
              onClick={() => {
                soundFx.playClick();
                const next: EnvironmentType =
                  environment === 'rooftop' ? 'tunnel' : environment === 'tunnel' ? 'studio' : 'rooftop';
                setEnvironment(next);
              }}
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-mono font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition"
              title="Toggle Live Environment (Rooftop Cityscape / Wind Tunnel / Studio)"
            >
              <Building2 className="w-3.5 h-3.5 text-cyan-600" />
              <span className="capitalize">{environment}</span>
            </button>

            {/* Time of Day Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                const nextTod: TimeOfDay =
                  timeOfDay === 'day' ? 'sunset' : timeOfDay === 'sunset' ? 'night' : 'day';
                setTimeOfDay(nextTod);
              }}
              className="p-1.5 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition"
              title={`Switch Atmosphere (Current: ${timeOfDay})`}
            >
              {timeOfDay === 'day' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : timeOfDay === 'sunset' ? (
                <Sunset className="w-4 h-4 text-orange-500" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            <div className="w-px h-4 bg-stone-300 mx-0.5" />

            {/* Toggle Airflow Streamlines */}
            <button
              onClick={() => {
                soundFx.playClick();
                setShowAirflow(!showAirflow);
              }}
              className={`p-1.5 rounded-full transition ${
                showAirflow ? 'bg-cyan-50 text-cyan-700' : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Toggle Wind Streamlines & Updrafts"
            >
              <Wind className="w-4 h-4" />
            </button>

            {/* Toggle Auto Orbit */}
            <button
              onClick={() => {
                soundFx.playClick();
                setAutoRotate(!autoRotate);
              }}
              className={`p-1.5 rounded-full transition ${
                autoRotate ? 'bg-purple-100 text-purple-700 font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Toggle 360° Auto-Orbit Showroom"
            >
              {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="w-px h-4 bg-stone-300 mx-0.5" />

            {/* Camera Presets: Center, Edge, Skyline */}
            <button
              onClick={() => setCameraPreset('center')}
              className="px-2.5 py-1 text-[11px] font-mono rounded-full text-stone-700 hover:bg-stone-100 transition"
              title="Center View right on Turbine"
            >
              Center
            </button>
            <button
              onClick={() => setCameraPreset('edge')}
              className="px-2.5 py-1 text-[11px] font-mono rounded-full text-stone-700 hover:bg-stone-100 transition hidden sm:inline"
              title="Parapet Updraft Edge Angle"
            >
              Updraft
            </button>
            <button
              onClick={() => setCameraPreset('skyline')}
              className="px-2.5 py-1 text-[11px] font-mono rounded-full text-stone-700 hover:bg-stone-100 transition hidden md:inline"
              title="City Skyline Panorama Angle"
            >
              Skyline
            </button>

            <div className="w-px h-4 bg-stone-300 mx-0.5" />

            {/* Zoom In/Out */}
            <button
              onClick={() => handleZoom('in')}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
