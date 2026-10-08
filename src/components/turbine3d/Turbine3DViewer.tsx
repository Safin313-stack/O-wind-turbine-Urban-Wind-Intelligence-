import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { useTelemetry } from '../../context/TelemetryContext';
import { soundFx } from '../../utils/audio';
import { 
  Rotate3d, 
  ZoomIn, 
  ZoomOut, 
  Wind, 
  Layers, 
  Sliders, 
  Sparkles,
  Maximize2,
  Box,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

interface Turbine3DViewerProps {
  height?: string;
  showControls?: boolean;
}

export const Turbine3DViewer: React.FC<Turbine3DViewerProps> = ({
  height = '420px',
  showControls = true,
}) => {
  const { telemetry } = useTelemetry();
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'aerodynamic'>('solid');
  const [showAirflow, setShowAirflow] = useState<boolean>(true);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [manualWindOverride, setManualWindOverride] = useState<number | null>(null);
  const [cadModelLoaded, setCadModelLoaded] = useState<boolean>(false);
  const [useActualCad, setUseActualCad] = useState<boolean>(true);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rotorGroupRef = useRef<THREE.Group | null>(null);
  const windParticlesRef = useRef<THREE.Points | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);
  const currentRPMRef = useRef<number>(telemetry.rpm);

  // References to meshes
  const cadMeshRef = useRef<THREE.Mesh | null>(null);
  const proceduralGroupRef = useRef<THREE.Group | null>(null);
  const mainSphereMeshRef = useRef<THREE.Mesh | null>(null);
  const internalCoreMeshRef = useRef<THREE.Mesh | null>(null);
  const ventGroupsRef = useRef<THREE.Group[]>([]);
  const baseGroupRef = useRef<THREE.Group | null>(null);

  // Active wind speed
  const activeWindSpeed = manualWindOverride ?? telemetry.windSpeed;
  const effectiveRPM = manualWindOverride ? Math.round(manualWindOverride * 53.5) : telemetry.rpm;

  useEffect(() => {
    currentRPMRef.current = effectiveRPM;
  }, [effectiveRPM]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const heightPx = container.clientHeight || 400;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.1, 100);
    camera.position.set(0, 1.1, 3.7);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting setup (Optimized for maximum visual clarity & edge definition)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    // Electric cyan rim light for crisp spherical silhouette
    const rimLight = new THREE.DirectionalLight(0x0284c7, 3.5);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Warm bounce fill light
    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    fillLight.position.set(4, -3, -2);
    scene.add(fillLight);

    // Subtle light studio grid
    const gridHelper = new THREE.GridHelper(6, 24, 0xd6d3d1, 0xe7e5e4);
    gridHelper.position.y = -1.2;
    scene.add(gridHelper);

    // 5. Construct Groups
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Base Pedestal
    const baseGroup = new THREE.Group();
    baseGroupRef.current = baseGroup;
    rootGroup.add(baseGroup);

    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
    });
    materialsRef.current.push(baseMat);

    const basePedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.55, 0.25, 32),
      baseMat
    );
    basePedestal.position.y = -1.05;
    baseGroup.add(basePedestal);

    const genHousing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.35, 32),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 })
    );
    genHousing.position.y = -0.78;
    baseGroup.add(genHousing);

    // Central Shaft (8mm precision ground axis)
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });
    const centralShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.0, 24),
      shaftMat
    );
    rootGroup.add(centralShaft);

    // Central Rotor Group (Spins dynamically)
    const rotorGroup = new THREE.Group();
    rotorGroupRef.current = rotorGroup;
    rootGroup.add(rotorGroup);

    // Procedural Assembly Container (for exploded CAD mode)
    const proceduralGroup = new THREE.Group();
    proceduralGroupRef.current = proceduralGroup;
    rotorGroup.add(proceduralGroup);

    const shellMat = new THREE.MeshStandardMaterial({
      color: 0x0f223d,
      roughness: 0.25,
      metalness: 0.45,
      transparent: true,
      opacity: 0.92,
    });
    materialsRef.current.push(shellMat);

    const mainSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.92, 36, 36),
      shellMat
    );
    mainSphereMeshRef.current = mainSphere;
    proceduralGroup.add(mainSphere);

    // Helical Cross-Vents
    const ventMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x004755,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.7,
    });
    materialsRef.current.push(ventMat);

    ventGroupsRef.current = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const ventRing = new THREE.Group();
      ventRing.rotation.y = angle;
      ventRing.rotation.x = Math.PI * 0.18 * Math.sin(angle);

      const ventDuct = new THREE.Mesh(
        new THREE.TorusGeometry(0.88, 0.075, 16, 48, Math.PI * 0.75),
        ventMat
      );
      ventDuct.rotation.z = Math.PI * 0.35;
      ventRing.add(ventDuct);

      const scoopMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x064e3b,
        emissiveIntensity: 0.4,
        roughness: 0.4,
      });
      const scoop = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.32, 12),
        scoopMat
      );
      scoop.position.set(0.75 * Math.cos(angle), 0.35 * Math.sin(angle * 2), 0.4 * Math.sin(angle));
      scoop.rotation.z = -Math.PI / 4;
      ventRing.add(scoop);

      ventGroupsRef.current.push(ventRing);
      proceduralGroup.add(ventRing);
    }

    // Internal Core Magnet Assembly
    const internalCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.38, 1),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x581c87,
        emissiveIntensity: 0.8,
        wireframe: true,
      })
    );
    internalCoreMeshRef.current = internalCore;
    proceduralGroup.add(internalCore);

    // 6. LOAD ACTUAL CAD MODEL (OWind_Body.stl from SolidWorks project)
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
        const scaleFactor = 1.82 / maxDim; // Normalize to ~1.82 units

        const cadMat = new THREE.MeshPhysicalMaterial({
          color: 0xfafafa, // Pure lustrous aerospace pearl white for maximum visual clarity
          metalness: 0.18,
          roughness: 0.22,
          clearcoat: 0.85,
          clearcoatRoughness: 0.1,
          reflectivity: 0.9,
        });
        materialsRef.current.push(cadMat);

        const cadMesh = new THREE.Mesh(geometry, cadMat);
        cadMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        cadMeshRef.current = cadMesh;

        rotorGroup.add(cadMesh);
        setCadModelLoaded(true);

        // By default show the actual CAD model
        proceduralGroup.visible = false;
        cadMesh.visible = true;
      },
      undefined,
      (error) => {
        console.warn('Could not load /models/OWind_Body.stl, using procedural CAD fallback:', error);
        proceduralGroup.visible = true;
      }
    );

    // 7. Multi-directional Wind Particle Stream Flow
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.4 + Math.random() * 2.2;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 2.8;
      const z = Math.sin(angle) * radius;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities[i * 3] = -x * 0.012 + (Math.random() - 0.5) * 0.005;
      particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      particleVelocities[i * 3 + 2] = -z * 0.012 + (Math.random() - 0.5) * 0.005;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x0284c7,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
    });

    const windParticles = new THREE.Points(particleGeo, particleMat);
    windParticlesRef.current = windParticles;
    scene.add(windParticles);

    // 8. Orbit Controls Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.2;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.6, Math.min(1.0, targetRotationX));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Mobile touch controls for 3D turbine rotation
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.6, Math.min(1.0, targetRotationX));
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const zoomDelta = e.deltaY * 0.002;
      const newZ = Math.max(2.0, Math.min(6.5, cameraRef.current.position.z + zoomDelta));
      cameraRef.current.position.z = newZ;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera orbit
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.1;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.1;

      // Turbine Dynamic Rotation: proportional to live RPM
      if (rotorGroupRef.current) {
        const radPerSec = (currentRPMRef.current / 60) * 0.8;
        rotorGroupRef.current.rotation.y += radPerSec * delta;
      }

      // Wind Particle Flow Simulation
      if (windParticlesRef.current && showAirflow) {
        const positions = windParticlesRef.current.geometry.attributes.position.array as Float32Array;
        const speedMultiplier = Math.max(0.5, currentRPMRef.current / 120);

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          positions[idx] += particleVelocities[idx] * speedMultiplier;
          positions[idx + 1] += particleVelocities[idx + 1] * speedMultiplier;
          positions[idx + 2] += particleVelocities[idx + 2] * speedMultiplier;

          const distSq = positions[idx] * positions[idx] + positions[idx + 2] * positions[idx + 2];
          if (distSq < 0.65 || distSq > 16 || Math.abs(positions[idx + 1]) > 1.8) {
            const angle = Math.random() * Math.PI * 2;
            const r = 2.2 + Math.random() * 1.5;
            positions[idx] = Math.cos(angle) * r;
            positions[idx + 1] = (Math.random() - 0.5) * 2.4;
            positions[idx + 2] = Math.sin(angle) * r;
          }
        }
        windParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 400;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      materialsRef.current.forEach(m => m.dispose());
    };
  }, []);

  // Toggle between Actual CAD Model and Exploded/Procedural Model
  useEffect(() => {
    if (!cadMeshRef.current || !proceduralGroupRef.current) return;

    if (useActualCad && !isExploded) {
      cadMeshRef.current.visible = true;
      proceduralGroupRef.current.visible = false;
    } else {
      cadMeshRef.current.visible = false;
      proceduralGroupRef.current.visible = true;
    }
  }, [useActualCad, isExploded]);

  // Handle Exploded View animation on procedural model
  useEffect(() => {
    if (!mainSphereMeshRef.current || !internalCoreMeshRef.current || !baseGroupRef.current) return;

    if (isExploded) {
      // Force procedural group visible for exploded view
      if (cadMeshRef.current) cadMeshRef.current.visible = false;
      if (proceduralGroupRef.current) proceduralGroupRef.current.visible = true;

      mainSphereMeshRef.current.scale.set(1.4, 1.4, 1.4);
      (mainSphereMeshRef.current.material as THREE.MeshStandardMaterial).opacity = 0.45;
      internalCoreMeshRef.current.scale.set(1.3, 1.3, 1.3);
      baseGroupRef.current.position.y = -0.5;

      ventGroupsRef.current.forEach((vent, i) => {
        const factor = 0.35;
        vent.position.set(
          Math.cos((i * Math.PI) / 3) * factor,
          (i % 2 === 0 ? 0.2 : -0.2),
          Math.sin((i * Math.PI) / 3) * factor
        );
      });
    } else {
      mainSphereMeshRef.current.scale.set(1, 1, 1);
      (mainSphereMeshRef.current.material as THREE.MeshStandardMaterial).opacity = 0.92;
      internalCoreMeshRef.current.scale.set(1, 1, 1);
      baseGroupRef.current.position.y = 0;

      ventGroupsRef.current.forEach((vent) => {
        vent.position.set(0, 0, 0);
      });

      if (useActualCad && cadMeshRef.current && proceduralGroupRef.current) {
        cadMeshRef.current.visible = true;
        proceduralGroupRef.current.visible = false;
      }
    }
  }, [isExploded, useActualCad]);

  // Update Wireframe / Material mode
  useEffect(() => {
    // Apply to CAD mesh
    if (cadMeshRef.current) {
      const mat = cadMeshRef.current.material as THREE.MeshStandardMaterial;
      if (viewMode === 'wireframe') {
        mat.wireframe = true;
      } else if (viewMode === 'aerodynamic') {
        mat.wireframe = false;
        mat.color = new THREE.Color(0x00e5ff);
        mat.metalness = 0.9;
      } else {
        mat.wireframe = false;
        mat.color = new THREE.Color(0x0f2a48);
        mat.metalness = 0.75;
      }
    }

    // Apply to procedural meshes
    if (proceduralGroupRef.current) {
      proceduralGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (viewMode === 'wireframe') {
            child.material.wireframe = true;
          } else if (viewMode === 'aerodynamic') {
            child.material.wireframe = false;
            child.material.color = new THREE.Color(0x00e5ff);
            child.material.metalness = 0.9;
          } else {
            child.material.wireframe = false;
          }
        }
      });
    }
  }, [viewMode]);

  const handleZoom = (direction: 'in' | 'out') => {
    soundFx.playClick();
    if (!cameraRef.current) return;
    const factor = direction === 'in' ? -0.4 : 0.4;
    cameraRef.current.position.z = Math.max(2.0, Math.min(6.5, cameraRef.current.position.z + factor));
  };

  const handleResetCamera = () => {
    soundFx.playClick();
    if (!cameraRef.current || !sceneRef.current) return;
    cameraRef.current.position.set(0, 1.2, 3.8);
  };

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden border border-stone-200/90 bg-gradient-to-b from-[#FCFBF9] via-[#F7F5F0] to-[#EBE7DF] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group"
      style={{ height }}
    >
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Badge with SolidWorks Source Badge */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none z-10">
        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200 flex items-center gap-2 text-xs font-mono text-stone-800 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          <span className="font-semibold tracking-wide">
            {cadModelLoaded && useActualCad ? 'PHYSICAL CAD ROTOR' : 'O-WIND 3D ROTOR'}
          </span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-900 font-bold">{effectiveRPM} RPM</span>
        </div>

        {cadModelLoaded && useActualCad && (
          <div className="bg-emerald-50/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-300/80 text-[10px] font-mono text-emerald-800 flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>SOLIDWORKS CAD MESH (17,503 POLYS)</span>
          </div>
        )}

        {isExploded && (
          <div className="bg-purple-50/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-300 text-[10px] font-mono text-purple-800 shadow-sm">
            EXPLODED CAD ASSEMBLY ACTIVE
          </div>
        )}
      </div>

      {/* Manual Wind Velocity Slider overlay */}
      <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full border border-stone-200 font-mono text-xs text-stone-700 flex items-center gap-2 shadow-sm">
        <Wind className="w-3.5 h-3.5 text-cyan-600 animate-pulse ml-1" />
        <span className="text-[11px] text-stone-500">Wind:</span>
        <input
          type="range"
          min="1.0"
          max="7.0"
          step="0.2"
          value={activeWindSpeed}
          onChange={(e) => {
            setManualWindOverride(parseFloat(e.target.value));
          }}
          className="w-20 accent-stone-900 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          title="Drag to simulate wind velocity changes"
        />
        <strong className="text-stone-900 text-xs w-12 text-right font-bold">
          {activeWindSpeed.toFixed(1)} m/s
        </strong>
        {manualWindOverride !== null && (
          <button
            onClick={() => setManualWindOverride(null)}
            className="text-[10px] text-stone-600 hover:text-stone-900 px-2 py-0.5 rounded-full bg-stone-100 hover:bg-stone-200 mr-0.5 transition"
            title="Reset to default stream"
          >
            Auto
          </button>
        )}
      </div>

      {/* Bottom Floating Control Bar */}
      {showControls && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-auto">
          {/* Mode Switchers */}
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-full border border-stone-200 shadow-md">
            <button
              onClick={() => {
                soundFx.playClick();
                setViewMode('solid');
              }}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
                viewMode === 'solid'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Solid
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setViewMode('aerodynamic');
              }}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
                viewMode === 'aerodynamic'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Aero Vents
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setViewMode('wireframe');
              }}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
                viewMode === 'wireframe'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Wireframe
            </button>

            {/* Toggle Actual CAD Mesh vs Procedural */}
            {cadModelLoaded && (
              <>
                <div className="w-px h-4 bg-stone-300 mx-1" />
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setUseActualCad(!useActualCad);
                    if (isExploded) setIsExploded(false);
                  }}
                  className={`px-3 py-1 text-xs rounded-full font-mono font-medium transition-all ${
                    useActualCad && !isExploded
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Toggle Actual SolidWorks STL Mesh vs Procedural Model"
                >
                  CAD STL
                </button>
              </>
            )}
          </div>

          {/* Exploded View Toggle & Streamlines & Camera */}
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-full border border-stone-200 shadow-md">
            <button
              onClick={() => {
                soundFx.playClick();
                setIsExploded(!isExploded);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium transition-all ${
                isExploded
                  ? 'bg-purple-600 text-white shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Toggle Exploded CAD Assembly View"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Exploded</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setShowAirflow(!showAirflow);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium transition-all ${
                showAirflow
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Toggle multi-directional wind streamlines"
            >
              <Wind className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Streamlines</span>
            </button>

            <div className="w-px h-4 bg-stone-300 mx-0.5" />

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
            <button
              onClick={handleResetCamera}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition"
              title="Reset Camera Angle"
              aria-label="Reset angle"
            >
              <Rotate3d className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
