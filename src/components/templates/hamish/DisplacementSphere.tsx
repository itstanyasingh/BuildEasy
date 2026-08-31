import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Simplex 3D Noise GLSL algorithm (Ashima Arts)
const simplexNoiseGLSL = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

const vertexShader = `
${simplexNoiseGLSL}

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseStrength;
uniform float uDisplacementStrength;

void main() {
  vUv = uv;
  vNormal = normal;
  
  vec3 noisePos = position + vec3(0.0, 0.0, uTime * uSpeed);
  float noise = snoise(noisePos * uNoiseStrength);
  vNoise = noise;
  
  vec3 displacedPosition = position + normal * (noise * uDisplacementStrength);
  vPosition = displacedPosition;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

uniform vec3 uColor;
uniform vec3 uAccentColor;
uniform float uTime;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
  
  // Fresnel effect for outer neon edge glow
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.5);
  
  // Core colors
  vec3 baseColor = uColor;
  vec3 glowColor = uAccentColor;
  
  // Blend colors using noise, Fresnel glow, and normal orientation
  vec3 finalColor = mix(baseColor, glowColor, fresnel * 0.8 + (vNoise * 0.5 + 0.5) * 0.25);
  
  // Cyberpunk grid scanned-line details
  float lines = sin(vPosition.y * 22.0 + uTime * 1.5) * 0.5 + 0.5;
  finalColor += glowColor * lines * fresnel * 0.4;
  
  // Outer atmosphere glow
  gl_FragColor = vec4(finalColor, 0.9);
}
`;

interface DisplacementSphereProps {
  accentColor?: string;
}

export const DisplacementSphere: React.FC<DisplacementSphereProps> = ({ accentColor = '#00f0ff' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Geometry & Material
    const geometry = new THREE.IcosahedronGeometry(1.5, 48);

    // Convert hex accent color to THREE.Color
    const hexColor = accentColor.startsWith('#') ? accentColor : `#${accentColor}`;
    const accentThreeColor = new THREE.Color(hexColor);
    const darkBaseColor = new THREE.Color('#050510');

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0.2 },
        uNoiseStrength: { value: 0.7 },
        uDisplacementStrength: { value: 0.15 },
        uColor: { value: darkBaseColor },
        uAccentColor: { value: accentThreeColor },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Handle mouse move to rotate the mesh slightly
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = mouseX * 0.4;
      targetRotationX = mouseY * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize safely using requestAnimationFrame
    let resizeFrameId: number;
    const resizeObserver = new ResizeObserver((entries) => {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        for (const entry of entries) {
          const { width: newWidth, height: newHeight } = entry.contentRect;
          if (newWidth > 0 && newHeight > 0) {
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
          }
        }
      });
    });
    
    resizeObserver.observe(containerRef.current);

    // Animation loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      // Smooth rotation dampening (lerp)
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      mesh.rotation.y = elapsedTime * 0.08 + currentRotationY;
      mesh.rotation.x = elapsedTime * 0.05 + currentRotationX;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && renderer.domElement.parentNode) {
        resizeObserver.disconnect();
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [accentColor]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative"
      style={{ overflow: 'hidden' }}
    />
  );
};
