import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ExperienceItem } from '../../types';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, ArrowRight, 
  Volume2, VolumeX, Send, CheckCircle2, AlertCircle, Sparkles,
  Briefcase, GraduationCap, Code, Layers, Compass, Move
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';

interface Interactive3DPortfolioProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// Color palettes for project gradient backplates matching Adrian Hajdin's design
const BG_GRADIENTS = [
  'from-[#00c6ff] to-[#0072ff]', // Cyan to Deep Blue
  'from-[#f857a6] to-[#ff5858]', // Pink to Coral Red
  'from-[#43e97b] to-[#38f9d7]', // Green to Teal
  'from-[#fa709a] to-[#fee140]', // Rose to Gold
  'from-[#667eea] to-[#764ba2]', // Indigo to Purple
  'from-[#f12711] to-[#f5af19]', // Orange to Amber
];

// Sound Synthesizer using Web Audio API for seamless zero-asset ambient audio
class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;

  start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isPlaying = true;

      // Create gentle pentatonic chord progression
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C E G C E
      let step = 0;

      const playTone = () => {
        if (!this.ctx || !this.isPlaying) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const freq = notes[step % notes.length];
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 3.6);

        step++;
        this.timer = window.setTimeout(playTone, 2200);
      };

      playTone();
    } catch (e) {
      console.warn('AudioContext not supported or blocked');
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

// -------------------------------------------------------------
// 3D ISLAND & FLIGHT INTERACTIVE CANVAS COMPONENT
// -------------------------------------------------------------
const Interactive3DIslandCanvas: React.FC<{
  currentStage: number | null;
  setCurrentStage: (stage: number | null) => void;
  isReducedMotion: boolean;
}> = ({ currentStage, setCurrentStage, isReducedMotion }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRotatingRef = useRef(false);
  const lastXRef = useRef(0);
  const rotationSpeedRef = useRef(0);
  const islandRotationYRef = useRef(0.8);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd6e8ff);
    scene.fog = new THREE.FogExp2(0xd6e8ff, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4.5, 24);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x88bbff, 0.6);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.6);
    dirLight.position.set(20, 35, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // 4. Construct 3D Island Hierarchy
    const islandGroup = new THREE.Group();
    islandGroup.position.set(0, -2.5, 0);
    scene.add(islandGroup);

    // Main Island Terrain Base (Rocky Low-Poly Bottom)
    const baseGeo = new THREE.ConeGeometry(9.5, 7.5, 9);
    baseGeo.rotateX(Math.PI);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x5a4a42,
      roughness: 0.85,
      flatShading: true,
    });
    const rockBase = new THREE.Mesh(baseGeo, rockMat);
    rockBase.position.y = -3.5;
    rockBase.castShadow = true;
    rockBase.receiveShadow = true;
    islandGroup.add(rockBase);

    // Top Green Grass Plateau
    const grassGeo = new THREE.CylinderGeometry(9.2, 8.8, 1.2, 12);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x48b34f,
      roughness: 0.6,
      flatShading: true,
    });
    const grassTop = new THREE.Mesh(grassGeo, grassMat);
    grassTop.position.y = 0.4;
    grassTop.receiveShadow = true;
    islandGroup.add(grassTop);

    // Sandy Path
    const pathGeo = new THREE.CylinderGeometry(7.5, 7.5, 1.25, 8, 1, false, 0, Math.PI * 0.4);
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0xe5c48b,
      roughness: 0.9,
      flatShading: true,
    });
    const pathMesh = new THREE.Mesh(pathGeo, pathMat);
    pathMesh.position.set(0, 0.42, 0);
    pathMesh.rotation.y = 0.5;
    islandGroup.add(pathMesh);

    // Japanese Developer Shrine / Pagoda on Island
    const shrineGroup = new THREE.Group();
    shrineGroup.position.set(1.5, 1.0, -1.2);

    // Base deck
    const deckGeo = new THREE.BoxGeometry(4.2, 0.4, 4.2);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b3a2b, roughness: 0.7, flatShading: true });
    const deck = new THREE.Mesh(deckGeo, woodMat);
    deck.position.y = 0.2;
    shrineGroup.add(deck);

    // Pillars
    const pillarGeo = new THREE.CylinderGeometry(0.15, 0.15, 2.2, 6);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xc92a2a, roughness: 0.5 });
    const pillarCoords = [
      [-1.8, -1.8], [1.8, -1.8], [-1.8, 1.8], [1.8, 1.8]
    ];
    pillarCoords.forEach(([px, pz]) => {
      const p = new THREE.Mesh(pillarGeo, pillarMat);
      p.position.set(px, 1.3, pz);
      p.castShadow = true;
      shrineGroup.add(p);
    });

    // Walls
    const wallGeo = new THREE.BoxGeometry(3.2, 1.8, 3.2);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf4eee1, roughness: 0.4 });
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.y = 1.2;
    shrineGroup.add(walls);

    // Pagoda Roof Tier 1
    const roof1Geo = new THREE.ConeGeometry(3.8, 1.2, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3, flatShading: true });
    const roof1 = new THREE.Mesh(roof1Geo, roofMat);
    roof1.position.y = 2.7;
    roof1.rotation.y = Math.PI / 4;
    shrineGroup.add(roof1);

    // Pagoda Roof Tier 2
    const roof2Geo = new THREE.ConeGeometry(2.4, 1.0, 4);
    const roof2 = new THREE.Mesh(roof2Geo, roofMat);
    roof2.position.y = 3.6;
    roof2.rotation.y = Math.PI / 4;
    shrineGroup.add(roof2);

    islandGroup.add(shrineGroup);

    // Sakura Cherry Blossom Trees & Green Foliage
    const treeCoords = [
      { x: -4.5, z: 2.5, scale: 1.2, color: 0xffb7d5 }, // Sakura Pink
      { x: -5.2, z: -2.0, scale: 1.0, color: 0xff8fa3 }, // Deep Pink
      { x: 4.8, z: 2.8, scale: 1.1, color: 0x22c55e }, // Emerald Green
      { x: -1.5, z: 5.5, scale: 0.9, color: 0xffb7d5 }, // Sakura Pink
      { x: 4.0, z: -3.5, scale: 1.3, color: 0x16a34a }, // Forest Green
    ];

    treeCoords.forEach(({ x, z, scale, color }) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 1.0, z);
      treeGroup.scale.set(scale, scale, scale);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.2, 0.35, 2.0, 6);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2c11, roughness: 0.9, flatShading: true });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.0;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Foliage Clustered Spheres
      const folGeo = new THREE.DodecahedronGeometry(1.4, 1);
      const folMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6, flatShading: true });
      const foliage = new THREE.Mesh(folGeo, folMat);
      foliage.position.y = 2.4;
      foliage.castShadow = true;
      treeGroup.add(foliage);

      const folSmall = new THREE.Mesh(folGeo, folMat);
      folSmall.scale.set(0.6, 0.6, 0.6);
      folSmall.position.set(0.6, 2.8, 0.4);
      treeGroup.add(folSmall);

      islandGroup.add(treeGroup);
    });

    // Mountain Peaks / Rocks on Island
    const rockCoords = [
      { x: -3.5, z: -4.5, s: 2.2 },
      { x: -5.0, z: -4.0, s: 1.6 },
      { x: 5.5, z: -1.0, s: 1.8 },
      { x: -2.0, z: -5.5, s: 2.8 },
    ];
    rockCoords.forEach(({ x, z, s }) => {
      const mGeo = new THREE.DodecahedronGeometry(s, 0);
      const mMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.9, flatShading: true });
      const mMesh = new THREE.Mesh(mGeo, mMat);
      mMesh.position.set(x, 1.0, z);
      mMesh.castShadow = true;
      islandGroup.add(mMesh);
    });

    // Orbiting mini floating satellite rocks
    const satelliteGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const satGeo = new THREE.DodecahedronGeometry(0.6 + Math.random() * 0.5, 0);
      const satMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.8, flatShading: true });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 6) * Math.PI * 2;
      const radius = 12.5 + Math.random() * 2;
      satMesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 3, Math.sin(angle) * radius);
      satelliteGroup.add(satMesh);
    }
    islandGroup.add(satelliteGroup);

    // 5. Stylized 3D Airplane Model
    const planeGroup = new THREE.Group();
    planeGroup.position.set(0, 0.5, 12);
    planeGroup.scale.set(0.4, 0.4, 0.4);
    scene.add(planeGroup);

    // Fuselage
    const fuseGeo = new THREE.CylinderGeometry(0.6, 0.4, 4.2, 8);
    fuseGeo.rotateZ(Math.PI / 2);
    const fuseMat = new THREE.MeshStandardMaterial({ color: 0xd90429, roughness: 0.3 }); // Red
    const fuselage = new THREE.Mesh(fuseGeo, fuseMat);
    fuselage.castShadow = true;
    planeGroup.add(fuselage);

    // Cockpit Canopy
    const canopyGeo = new THREE.SphereGeometry(0.6, 8, 8);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.8 });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0.4, 0.4, 0);
    canopy.scale.set(1.5, 0.8, 0.8);
    planeGroup.add(canopy);

    // Wings
    const wingGeo = new THREE.BoxGeometry(1.2, 0.1, 6.5);
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    wings.position.set(0.2, 0.1, 0);
    wings.castShadow = true;
    planeGroup.add(wings);

    // Tail Fin
    const finGeo = new THREE.BoxGeometry(0.8, 1.2, 0.1);
    const fin = new THREE.Mesh(finGeo, wingMat);
    fin.position.set(-1.8, 0.8, 0);
    planeGroup.add(fin);

    // Propeller
    const propGeo = new THREE.BoxGeometry(0.1, 1.6, 0.2);
    const propMat = new THREE.MeshStandardMaterial({ color: 0x111827 });
    const prop = new THREE.Mesh(propGeo, propMat);
    prop.position.set(2.15, 0, 0);
    planeGroup.add(prop);

    // 6. Flying Low-Poly Bird
    const birdGroup = new THREE.Group();
    birdGroup.position.set(-15, 6, -10);
    birdGroup.scale.set(0.35, 0.35, 0.35);
    scene.add(birdGroup);

    const birdBodyGeo = new THREE.ConeGeometry(0.6, 2.0, 5);
    birdBodyGeo.rotateZ(-Math.PI / 2);
    const birdMat = new THREE.MeshStandardMaterial({ color: 0xfa5252, roughness: 0.5 });
    const birdBody = new THREE.Mesh(birdBodyGeo, birdMat);
    birdGroup.add(birdBody);

    const leftWingGeo = new THREE.BoxGeometry(1.4, 0.08, 1.8);
    const leftWing = new THREE.Mesh(leftWingGeo, birdMat);
    leftWing.position.set(0, 0.2, 1.0);
    birdGroup.add(leftWing);

    const rightWing = new THREE.Mesh(leftWingGeo, birdMat);
    rightWing.position.set(0, 0.2, -1.0);
    birdGroup.add(rightWing);

    // 7. Dynamic Sky Cloud Clusters
    const cloudsGroup = new THREE.Group();
    scene.add(cloudsGroup);
    for (let c = 0; c < 14; c++) {
      const singleCloud = new THREE.Group();
      const numBlobs = 4 + Math.floor(Math.random() * 4);
      for (let b = 0; b < numBlobs; b++) {
        const blobGeo = new THREE.DodecahedronGeometry(1.2 + Math.random() * 1.5, 1);
        const blobMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true });
        const blob = new THREE.Mesh(blobGeo, blobMat);
        blob.position.set((b - numBlobs / 2) * 1.4, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 1.2);
        singleCloud.add(blob);
      }
      const angle = (c / 14) * Math.PI * 2;
      const dist = 32 + Math.random() * 15;
      singleCloud.position.set(Math.cos(angle) * dist, 8 + Math.random() * 8, Math.sin(angle) * dist);
      cloudsGroup.add(singleCloud);
    }

    // 8. Pointer Event Handlers for Drag Rotation
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isRotatingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      lastXRef.current = clientX;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isRotatingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastXRef.current) / width;
      islandRotationYRef.current += delta * 2.8;
      rotationSpeedRef.current = delta * 2.8;
      lastXRef.current = clientX;
    };

    const handlePointerUp = () => {
      isRotatingRef.current = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        islandRotationYRef.current += 0.08;
      } else if (e.key === 'ArrowRight') {
        islandRotationYRef.current -= 0.08;
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('keydown', handleKeyDown);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia & Damping
      if (!isRotatingRef.current) {
        rotationSpeedRef.current *= 0.95;
        if (Math.abs(rotationSpeedRef.current) < 0.0001) rotationSpeedRef.current = 0;
        islandRotationYRef.current += rotationSpeedRef.current;
        // Subtle constant ambient drift if reduced motion is disabled
        if (!isReducedMotion) {
          islandRotationYRef.current += 0.0012;
        }
      }

      islandGroup.rotation.y = islandRotationYRef.current;

      // Calculate Stage based on rotation angle (Normalized 0 to 2*PI)
      const normalizedRotation =
        ((islandRotationYRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      let stage: number | null = null;
      if (normalizedRotation >= 5.85 || normalizedRotation <= 0.85) {
        stage = 1; // Stage 1: Welcome & Intro
      } else if (normalizedRotation >= 2.0 && normalizedRotation <= 2.9) {
        stage = 2; // Stage 2: About & Skills
      } else if (normalizedRotation >= 3.6 && normalizedRotation <= 4.6) {
        stage = 3; // Stage 3: Projects Portfolio
      } else if (normalizedRotation >= 4.9 && normalizedRotation <= 5.75) {
        stage = 4; // Stage 4: Contact & Collaboration
      }

      setCurrentStage(stage);

      // Spin Propeller
      prop.rotation.x += 0.45;

      // Plane Floating Wave Motion
      if (!isReducedMotion) {
        planeGroup.position.y = 0.5 + Math.sin(elapsedTime * 2.2) * 0.25;
        planeGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      // Bird Flight Trajectory & Wing Flap
      const birdAngle = elapsedTime * 0.45;
      birdGroup.position.x = Math.sin(birdAngle) * 16;
      birdGroup.position.z = Math.cos(birdAngle) * 16 - 2;
      birdGroup.position.y = 6 + Math.sin(elapsedTime * 1.5) * 1.2;
      birdGroup.rotation.y = birdAngle + Math.PI / 2;
      leftWing.rotation.x = Math.sin(elapsedTime * 8) * 0.4;
      rightWing.rotation.x = -Math.sin(elapsedTime * 8) * 0.4;

      // Cloud Slow Orbit
      cloudsGroup.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isReducedMotion, setCurrentStage]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing relative select-none"
    />
  );
};

// -------------------------------------------------------------
// 3D CONTACT FOX / CHARACTER CANVAS COMPONENT
// -------------------------------------------------------------
const Contact3DFoxCanvas: React.FC<{ isTyping: boolean }> = ({ isTyping }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambLight);
    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    // Construct Low-Poly Fox Model
    const foxGroup = new THREE.Group();
    foxGroup.position.set(0, -0.6, 0);
    scene.add(foxGroup);

    // Orange body
    const orangeMat = new THREE.MeshStandardMaterial({ color: 0xe65c00, roughness: 0.5, flatShading: true });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, flatShading: true });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2 });

    const bodyGeo = new THREE.BoxGeometry(1.4, 0.9, 2.2);
    const body = new THREE.Mesh(bodyGeo, orangeMat);
    body.position.y = 1.0;
    foxGroup.add(body);

    // Chest White Patch
    const chestGeo = new THREE.BoxGeometry(1.2, 0.7, 0.8);
    const chest = new THREE.Mesh(chestGeo, whiteMat);
    chest.position.set(0, 0.9, 0.8);
    foxGroup.add(chest);

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.6, 1.2);
    foxGroup.add(headGroup);

    const headGeo = new THREE.BoxGeometry(1.1, 0.9, 1.1);
    const head = new THREE.Mesh(headGeo, orangeMat);
    headGroup.add(head);

    // Snout
    const snoutGeo = new THREE.ConeGeometry(0.4, 0.9, 4);
    snoutGeo.rotateX(Math.PI / 2);
    const snout = new THREE.Mesh(snoutGeo, whiteMat);
    snout.position.set(0, -0.15, 0.8);
    headGroup.add(snout);

    // Nose
    const noseGeo = new THREE.SphereGeometry(0.1, 6, 6);
    const nose = new THREE.Mesh(noseGeo, blackMat);
    nose.position.set(0, -0.05, 1.25);
    headGroup.add(nose);

    // Ears
    const earGeo = new THREE.ConeGeometry(0.3, 0.6, 4);
    const leftEar = new THREE.Mesh(earGeo, orangeMat);
    leftEar.position.set(0.4, 0.65, 0.1);
    headGroup.add(leftEar);
    const rightEar = new THREE.Mesh(earGeo, orangeMat);
    rightEar.position.set(-0.4, 0.65, 0.1);
    headGroup.add(rightEar);

    // 4 Legs
    const legGeo = new THREE.BoxGeometry(0.3, 0.9, 0.3);
    const legCoords = [
      { x: -0.5, z: 0.8, name: 'fl' },
      { x: 0.5, z: 0.8, name: 'fr' },
      { x: -0.5, z: -0.8, name: 'bl' },
      { x: 0.5, z: -0.8, name: 'br' },
    ];
    const legs: THREE.Mesh[] = [];
    legCoords.forEach(({ x, z }) => {
      const leg = new THREE.Mesh(legGeo, blackMat);
      leg.position.set(x, 0.45, z);
      foxGroup.add(leg);
      legs.push(leg);
    });

    // Fluffy Tail
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 1.2, -1.1);
    foxGroup.add(tailGroup);

    const tailGeo = new THREE.ConeGeometry(0.45, 1.6, 6);
    tailGeo.rotateX(-Math.PI / 2.8);
    const tail = new THREE.Mesh(tailGeo, orangeMat);
    tailGroup.add(tail);

    const tailTipGeo = new THREE.ConeGeometry(0.3, 0.6, 6);
    tailTipGeo.rotateX(-Math.PI / 2.8);
    const tailTip = new THREE.Mesh(tailTipGeo, whiteMat);
    tailTip.position.set(0, 0.6, -0.7);
    tailGroup.add(tailTip);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animateFox = () => {
      animId = requestAnimationFrame(animateFox);
      const time = clock.getElapsedTime();

      if (isTyping) {
        // Energetic Running Animation when user types
        const speed = 14;
        legs[0].rotation.x = Math.sin(time * speed) * 0.6;
        legs[1].rotation.x = -Math.sin(time * speed) * 0.6;
        legs[2].rotation.x = -Math.sin(time * speed) * 0.6;
        legs[3].rotation.x = Math.sin(time * speed) * 0.6;
        body.position.y = 1.0 + Math.abs(Math.sin(time * speed * 0.5)) * 0.15;
        tailGroup.rotation.y = Math.sin(time * speed) * 0.4;
        headGroup.rotation.y = Math.sin(time * 6) * 0.2;
      } else {
        // Peaceful Idle Breathing Animation
        legs.forEach((l) => (l.rotation.x = 0));
        body.position.y = 1.0 + Math.sin(time * 2.5) * 0.04;
        tailGroup.rotation.z = Math.sin(time * 2.0) * 0.15;
        tailGroup.rotation.y = Math.sin(time * 1.5) * 0.2;
        headGroup.rotation.x = Math.sin(time * 1.8) * 0.06;
      }

      foxGroup.rotation.y = Math.PI / 4 + Math.sin(time * 0.8) * 0.1;
      renderer.render(scene, camera);
    };

    animateFox();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isTyping]);

  return <div ref={mountRef} className="w-full h-full min-h-[320px] select-none" />;
};

// -------------------------------------------------------------
// MAIN TEMPLATE EXPORT: ADRIAN HAJDIN 3D DEVELOPER PORTFOLIO
// -------------------------------------------------------------
export const Interactive3DDeveloperPortfolioTemplate: React.FC<Interactive3DPortfolioProps> = ({
  data,
  config,
}) => {
  const { profile, about, experience, education, skills, projects, contact, socialLinks } = data;

  // Active view tab: 'home' | 'about' | 'projects' | 'contact'
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'contact'>('home');
  const [currentStage, setCurrentStage] = useState<number | null>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isTypingContact, setIsTypingContact] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Reduced motion detection
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Audio Engine Instance
  const audioEngine = useMemo(() => new AmbientAudioEngine(), []);
  const toggleAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stop();
      setIsPlayingAudio(false);
    } else {
      audioEngine.start();
      setIsPlayingAudio(true);
    }
  };

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, [audioEngine]);

  // Safe data properties
  const name = profile?.name || 'Adrian';
  const role = profile?.title || 'Software Engineer & Full Stack Developer';
  const location = profile?.location || 'San Francisco, CA';
  const bio =
    profile?.bio ||
    about?.aboutText ||
    'Software Engineer based in California, specializing in technical education through hands-on coding and building applications.';
  const userEmail = profile?.email || contact?.email || '';

  const safeExperience = experience || [];
  const safeProjects = projects || [];
  const safeSkills = skills || [];

  // Handle Contact Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setContactSubmitted(true);
    if (userEmail) {
      window.location.href = `mailto:${userEmail}?subject=Contact%20from%20${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(formData.message)}%0A%0AReply%20to:%20${encodeURIComponent(
        formData.email
      )}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#edf2f7] text-[#334155] font-sans antialiased relative overflow-x-hidden selection:bg-[#2b77e7] selection:text-white">
      
      {/* 1. TOP NAVBAR WITH ADRIAN HAJDIN'S SIGNATURE BLUE INITIALS LOGO */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-none">
        
        {/* Logo Badge */}
        <button
          onClick={() => setActiveTab('home')}
          className="pointer-events-auto w-12 h-12 rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center font-bold text-xl cursor-pointer hover:scale-105 transition-transform border border-slate-200"
          title="Home"
        >
          <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-extrabold tracking-tight">
            {name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase() || 'AH'}
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="pointer-events-auto flex items-center gap-6 sm:gap-8 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-slate-200/80 text-sm sm:text-base font-semibold">
          <button
            onClick={() => setActiveTab('about')}
            className={`cursor-pointer transition-colors ${
              activeTab === 'about'
                ? 'text-[#0072ff] font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            About
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`cursor-pointer transition-colors ${
              activeTab === 'projects'
                ? 'text-[#0072ff] font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`cursor-pointer transition-colors ${
              activeTab === 'contact'
                ? 'text-[#0072ff] font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* 2. AUDIO TOGGLE BUTTON (BOTTOM LEFT CORNER) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={toggleAudio}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0072ff] hover:scale-110 transition-all cursor-pointer"
          title={isPlayingAudio ? 'Mute Ambient Sound' : 'Play Ambient Music'}
        >
          {isPlayingAudio ? (
            <Volume2 className="w-6 h-6 text-[#0072ff] animate-pulse" />
          ) : (
            <VolumeX className="w-6 h-6 text-slate-400" />
          )}
        </button>
      </div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="w-full min-h-screen">
        
        {/* ============================================================ */}
        {/* VIEW 1: HOME PAGE (Full 3D Interactive Island + HomeInfo)   */}
        {/* ============================================================ */}
        {activeTab === 'home' && (
          <div className="w-full h-screen relative overflow-hidden bg-[#d6e8ff]">
            
            {/* HomeInfo Floating Stage Banner */}
            <div className="absolute top-28 left-0 right-0 z-30 flex items-center justify-center px-6 pointer-events-none">
              <AnimatePresence mode="wait">
                {currentStage === 1 && (
                  <motion.div
                    key="stage1"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-auto max-w-md w-full bg-[#2b77e7] text-white py-4 px-8 rounded-2xl shadow-[0_8px_0_0_#1e3a8a] text-center space-y-1"
                  >
                    <h1 className="text-lg sm:text-xl font-medium">
                      Hi, I am{' '}
                      <span className="font-bold text-white tracking-wide">{name}</span> 👋
                    </h1>
                    <p className="text-xs sm:text-sm font-normal text-blue-100">
                      A {role} from {location}
                    </p>
                  </motion.div>
                )}

                {currentStage === 2 && (
                  <motion.div
                    key="stage2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-auto max-w-lg w-full bg-[#2b77e7] text-white p-6 rounded-2xl shadow-[0_8px_0_0_#1e3a8a] text-center space-y-4"
                  >
                    <p className="text-sm sm:text-base font-medium leading-relaxed">
                      Worked with many companies and picked up many skills along the way
                    </p>
                    <button
                      onClick={() => setActiveTab('about')}
                      className="inline-flex items-center gap-2 bg-white text-[#2b77e7] px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base shadow-[0_4px_0_0_#e2e8f0] hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {currentStage === 3 && (
                  <motion.div
                    key="stage3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-auto max-w-lg w-full bg-[#2b77e7] text-white p-6 rounded-2xl shadow-[0_8px_0_0_#1e3a8a] text-center space-y-4"
                  >
                    <p className="text-sm sm:text-base font-medium leading-relaxed">
                      Led multiple projects to success over the years. Curious about the impact?
                    </p>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="inline-flex items-center gap-2 bg-white text-[#2b77e7] px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base shadow-[0_4px_0_0_#e2e8f0] hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <span>Visit my portfolio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {currentStage === 4 && (
                  <motion.div
                    key="stage4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-auto max-w-lg w-full bg-[#2b77e7] text-white p-6 rounded-2xl shadow-[0_8px_0_0_#1e3a8a] text-center space-y-4"
                  >
                    <p className="text-sm sm:text-base font-medium leading-relaxed">
                      Need a project done or looking for a dev? I'm just a few keystrokes away
                    </p>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="inline-flex items-center gap-2 bg-white text-[#2b77e7] px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base shadow-[0_4px_0_0_#e2e8f0] hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <span>Let's talk</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Instruction helper hint */}
            <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 shadow-sm border border-slate-200/60 pointer-events-none">
              <Move className="w-4 h-4 text-[#0072ff]" />
              <span>Drag to rotate island or use Arrow keys</span>
            </div>

            {/* Three.js Interactive 3D Island Canvas */}
            <Interactive3DIslandCanvas
              currentStage={currentStage}
              setCurrentStage={setCurrentStage}
              isReducedMotion={isReducedMotion}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: ABOUT PAGE (Bio + Skills Grid + Experience Timeline) */}
        {/* ============================================================ */}
        {activeTab === 'about' && (
          <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-32 pb-24 space-y-20">
            
            {/* Header / Intro */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Hello, I'm{' '}
                <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-bold">
                  {name}
                </span>{' '}
                👋
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
                {bio}
              </p>
            </div>

            {/* My Skills Section */}
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                My Skills
              </h2>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                {safeSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id || index}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col items-center justify-center p-2 text-center group cursor-pointer transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0072ff] flex items-center justify-center mb-1 group-hover:bg-[#0072ff] group-hover:text-white transition-colors">
                      <Code className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 truncate w-full">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Work Experience Section */}
            {safeExperience.length > 0 && (
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Work Experience
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base mt-1">
                    What I have done so far
                  </p>
                </div>

                <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-12 pl-6 sm:pl-8">
                  {safeExperience.map((exp, idx) => (
                    <div key={exp.id || idx} className="relative group">
                      
                      {/* Timeline Node Circle */}
                      <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#0072ff] border-4 border-white shadow-md flex items-center justify-center" />

                      {/* Card Content */}
                      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="text-xl font-bold text-slate-800">
                            {exp.role}
                          </h3>
                          <span className="text-xs font-bold text-[#0072ff] bg-blue-50 px-3 py-1 rounded-full w-max">
                            {exp.duration}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-slate-500">
                          {exp.company} {exp.location ? `• ${exp.location}` : ''}
                        </p>

                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {exp.description}
                        </p>

                        {exp.achievements && exp.achievements.length > 0 && (
                          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 pt-2">
                            {exp.achievements.map((ach, i) => (
                              <li key={i}>{ach}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom CTA Banner */}
            <div className="w-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_12px_32px_rgba(0,114,255,0.25)]">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Have a project in mind?
                </h3>
                <p className="text-blue-100 text-sm sm:text-base">
                  Let's build something together!
                </p>
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="bg-white text-[#0072ff] font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-slate-50 transition-all cursor-pointer shrink-0"
              >
                Contact
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: PROJECTS PAGE (Gradient Cards + Live Link Arrows)    */}
        {/* ============================================================ */}
        {activeTab === 'projects' && (
          <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-32 pb-24 space-y-16">
            
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
                My{' '}
                <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-bold">
                  Projects
                </span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
                I've embarked on numerous projects throughout the years, but these are the ones I hold closest to my heart. Many of them are open-source, so if you come across something that piques your interest, feel free to explore the codebase.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {safeProjects.map((project, index) => {
                const gradient = BG_GRADIENTS[index % BG_GRADIENTS.length];

                return (
                  <motion.div
                    key={project.id || index}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Gradient Icon / Image Backplate */}
                      <div className="relative w-14 h-14">
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} rotate-6 opacity-80`}
                        />
                        <div className="relative w-full h-full rounded-2xl bg-white shadow-md flex items-center justify-center text-slate-800">
                          <Layers className="w-6 h-6 text-[#0072ff]" />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                        {project.name}
                      </h3>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-4">
                        {project.description}
                      </p>

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.technologies.map((t, i) => (
                            <span
                              key={i}
                              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions: Live Link and GitHub Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-bold text-sm text-[#0072ff] hover:underline"
                        >
                          <span>Live Link</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <span />
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                          title="View Source"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA Banner */}
            <div className="w-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_12px_32px_rgba(0,114,255,0.25)]">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Have a project in mind?
                </h3>
                <p className="text-blue-100 text-sm sm:text-base">
                  Let's build something together!
                </p>
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="bg-white text-[#0072ff] font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-slate-50 transition-all cursor-pointer shrink-0"
              >
                Contact
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 4: CONTACT PAGE (Split Form + Reactive 3D Fox Canvas)   */}
        {/* ============================================================ */}
        {activeTab === 'contact' && (
          <div className="max-w-6xl mx-auto px-6 sm:px-12 pt-32 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Contact Form */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
                    Get in{' '}
                    <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent">
                      Touch
                    </span>
                  </h1>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Fill out the form below or reach out directly to start a conversation.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-700">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setIsTypingContact(true);
                      }}
                      onBlur={() => setIsTypingContact(false)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0072ff] shadow-sm text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setIsTypingContact(true);
                      }}
                      onBlur={() => setIsTypingContact(false)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0072ff] shadow-sm text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-700">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Let me know how I can help you..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        setIsTypingContact(true);
                      }}
                      onBlur={() => setIsTypingContact(false)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0072ff] shadow-sm text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0072ff] hover:bg-[#005ecb] text-white font-bold py-3.5 px-6 rounded-xl shadow-[0_4px_16px_rgba(0,114,255,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>

                  {contactSubmitted && (
                    <div className="p-3 bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-900 text-xs sm:text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-zinc-900" />
                      <span>Thank you! Your email client has been prepared.</span>
                    </div>
                  )}
                </form>

                {/* Social Connect Links */}
                <div className="flex items-center gap-4 pt-2">
                  {socialLinks?.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0072ff] hover:scale-110 transition-transform"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}

                  {socialLinks?.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0072ff] hover:scale-110 transition-transform"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}

                  {socialLinks?.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0072ff] hover:scale-110 transition-transform"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: 3D Interactive Fox Canvas */}
              <div className="w-full h-[400px] sm:h-[500px] rounded-3xl bg-gradient-to-b from-blue-50/60 to-slate-100 border border-slate-200/80 shadow-inner overflow-hidden flex items-center justify-center relative">
                <Contact3DFoxCanvas isTyping={isTypingContact} />
                <div className="absolute bottom-4 text-center w-full text-xs text-slate-400 font-mono">
                  {isTypingContact ? '🦊 Fox is running!' : '🦊 Fox is resting...'}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer className="w-full border-t border-slate-200/80 bg-white/60 backdrop-blur-md py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-500 gap-2">
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <span>Crafted with Three.js & React</span>
        </p>
      </footer>
    </div>
  );
};
